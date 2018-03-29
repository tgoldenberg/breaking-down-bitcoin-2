import BlockModel from 'models/Block';
import { isBlockValid } from 'utils/validateBlock';
import store from 'store/store';

export const DL = `~~~~~~`;

export async function wait(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, (1000 * sec));
  });
}

export async function handleData(data) {
  const { client, isServer, ip } = this;
  // message type, arguments
  const [ messageType, ...args ] = data.split(DL);
  console.log('> New message: '.yellow, messageType, args);
  let lastBlockHash, version, peerLastBlockHash, myVersion, peerLastBlock, blocks, blockheaders, block, index;
  let lastBlock, savedBlock, newBlock;
  switch(messageType) {
    case 'VERSION':
      // check if version is compatible
      // check if peer has more blocks - send GETBLOCKS response
      [ version, peerLastBlockHash ] = args;
      myVersion = store.getState().version;
      if (myVersion.toString() !== version) {
        break;
      }
      // if isServer = true, send response VERSION message
      lastBlockHash = store.getState().lastBlock.hash;
      if (isServer) {
        client.write(['VERSION', myVersion, lastBlockHash ].join(DL));
      }
      // if same last hash, set as "synced"
      peerLastBlock = await BlockModel.findOne({ hash: peerLastBlockHash });
      if (!peerLastBlock) {
        // we need to get blocks from them
        client.write([ 'GETBLOCKS', lastBlockHash ].join(DL));
      } else {
        store.dispatch({ type: 'SYNC_PEER', ip });
      }
      break;
    case 'GETBLOCKS':
      // scan to see if we have blocks after the hash provided
      // if we do, send a BLOCKHEADERS response with list of block hashes
      peerLastBlockHash = args[0];
      peerLastBlock = await BlockModel.findOne({ hash: peerLastBlockHash });
      if (peerLastBlockHash) {
        blocks = await BlockModel.find({ timestamp: { $gt: peerLastBlock.timestamp } }).sort({ timestamp: 1 }).limit(50);
        client.write(['BLOCKHEADERS', ...blocks.map(({ hash }) => hash)].join(DL));
      }
      break;
    case 'BLOCKHEADERS':
      // ~50 hashes, distribute among peers
      // response with REQUESTBLOCK
      blockheaders = args;
      if (!blockheaders.length) {
        store.dispatch({ type: 'SYNC_PEER', ip });
        break;
      }
      store.dispatch({ type: 'ADD_UNFETCHED_HEADERS', headers: blockheaders });
      let { allPeers: peers, unfetchedHeaders } = store.getState();
      blockheaders = Array.from(unfetchedHeaders);
      index = 0;
      while (blockheaders.length) {
        let peer = peers[index];
        if (!!peer && !!peer.client) {
          let header = blockheaders.shift();
          peer.client.write(['REQUESTBLOCK', header ].join(DL));
          store.dispatch({ type: 'LOADING_BLOCK', header });
          index = peers.length % (index + 1);
          await wait(1);
        }
      }
      break;
    case 'REQUESTBLOCK':
      // we check if we have the requested block, serialize and response with SENDBLOCK message
      let header = args[0];
      block = await BlockModel.findOne({ hash: header });
      if (block) {
        let msg = JSON.stringify(block);
        client.write(['SENDBLOCK', JSON.stringify(block)].join(DL));
      }
      break;
    case 'SENDBLOCK':
      // validate block and its transactions
      // if is valid, add to MongoDB, update lastBlock
      block = JSON.parse(args[0]);
      console.log('> Block: ', block);
      // check if we already have it
      savedBlock = await BlockModel.findOne({ hash: block.hash });
      if (savedBlock) {
        break;
      }
      // does the previousHash match our current lastBlock
      lastBlock = store.getState().lastBlock;
      if (!lastBlock) {
        break;
      }
      // validate block
      let isValid = await isBlockValid(block, lastBlock, false);
      console.log('> new block - is valid: ', block, lastBlock);
      if (isValid) {
        // add to chain
        newBlock = new BlockModel(block);
        await newBlock.save();
        store.dispatch({ type: 'NEW_BLOCK', block: newBlock });
        let numBlocksToSave = store.getState().unfetchedHeaders.size;
        if (numBlocksToSave === 0) {
          lastBlockHash = store.getState().lastBlock.hash;
          client.write(['GETBLOCKS', lastBlockHash].join(DL));
        }
      }
      break;
  }
}
