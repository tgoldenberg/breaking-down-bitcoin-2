import BlockModel from 'models/Block';
import { isBlockValid } from 'utils/validateBlock';
import store from 'store/store';

export const DL = `~~~~~`;

async function wait(s) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, s * 1000);
  });
}

export async function handleData(data) {
  const { client, isServer, ip } = this;
  console.log(data.split(DL).join(' '));
  // initialize variables
  const [ messageType, ...args ] = data.split(DL);

  let lastBlockHash, version, peerLastBlockHash, myVersion, peerLastBlock, blocks, blockheaders, block, index;
  let lastBlock, savedBlock, newBlock;

  switch(messageType) {
    case 'VERSION':
      console.log('> Version message: ', args);
      // check if version is compatible
      [ version, peerLastBlockHash ] = args;
      myVersion = store.getState().version;
      if (myVersion.toString() !== version) {
        return;
      }
      // if isServer, send response message
      lastBlockHash = store.getState().lastBlock.hash;
      if (isServer) {
        client.write(['VERSION', '1', lastBlockHash ].join(DL));
      }
      // if same blockheader set as synced
      // if peer has more blocks send GETBLOCKS request
      peerLastBlock = await BlockModel.findOne({ hash: peerLastBlockHash });
      if (!peerLastBlock) {
        client.write(['GETBLOCKS', lastBlockHash].join(DL));
      } else {
        store.dispatch({ type: 'SYNC_PEER', ip });
      }
      break;
    case 'GETBLOCKS':
      console.log('> Getblocks message: ', args);
      // scan if we have blocks after block hash provided
      // if we have blocks, send BLOCKHEADERS response
      peerLastBlockHash = args[0];
      peerLastBlock = await BlockModel.findOne({ hash: peerLastBlockHash });
      if (peerLastBlock) {
        blocks = await BlockModel.find({ timestamp: { $gt: peerLastBlock.timestamp } }).sort({ timestamp: 1 }).limit(50);
        client.write(['BLOCKHEADERS', ...blocks.map(({ hash }) => hash) ].join(DL));
      }
      break;
    case 'BLOCKHEADERS':
      console.log('> Block headers message: ', args);
      // go through list of connected peers, and send REQUESTBLOCK evenly across network
      blockheaders = args;
      if (!blockheaders.length) {
        store.dispatch({ type: 'SYNC_PEER', ip });
        return;
      }
      store.dispatch({ type: 'ADD_UNFETCHED_HEADERS', headers: blockheaders });
      let { allPeers: peers, unfetchedHeaders } = store.getState();
      blockheaders = Array.from(unfetchedHeaders);
      index = 0;
      while (blockheaders.length) {
        let peer = peers[index];
        if (!!peer && peer.client) {
          let header = blockheaders.shift();
          peer.client.write(['REQUESTBLOCK', header].join(DL));
          store.dispatch({ type: 'LOADING_BLOCK', header });
          index = peers.length % (index + 1);
          await wait(1);
        }
      }
      break;
    case 'REQUESTBLOCK':
      console.log('> Request block message: ', args);
      // check if we have the requested block
      // if we have it, serialize and send response SENDBLOCK message
      let header = args[0];
      block = await BlockModel.findOne({ hash: header });
      if (block) {
        let msg = JSON.stringify(block);
        client.write(['SENDBLOCK', msg].join(DL));
      }
      break;
    case 'SENDBLOCK':
      console.log('> Send block message: ', args);
      // validate block and its transactions
      // if block is valid, add to MongoDB and update lastBlock and numBlocks in store
      block = JSON.parse(args[0]);
      // check if already have
      savedBlock = await BlockModel.findOne({ hash: block.hash });
      if (savedBlock) {
        return;
      }
      // if we do not have, does previousHash match our lastBlock.hash?
      lastBlock = store.getState().lastBlock;
      if (!lastBlock) {
        break;
      }
      // validate block
      let isValid = await isBlockValid(block, lastBlock, false);
      console.log('> Is valid block: ', block, isValid);
      if (isValid) {
        // add to chain
        newBlock = new BlockModel(block);
        await newBlock.save();
        store.dispatch({ type: 'NEW_BLOCK', block: newBlock });
        let numBlocksToSave = store.getState().unfetchedHeaders.size;
        if (numBlocksToSave <= 0) {
          lastBlockHash = store.getState().lastBlock.hash;
          client.write(['GETBLOCKS', lastBlockHash].join(DL));
        }
      }
      break;
  }
}
