import Block from 'classes/Block';
import BlockModel from 'models/Block';
import SHA256 from 'js-sha256';
import { unlockTransaction } from 'utils/verifySignature';
import { v1 } from 'uuid';

export const difficulty = 22;
export const COIN = 100000000;
const uuid = v1;

const uuidOptions = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date('2018-01-01').getTime(),
  nsecs: 5678
};

export const myWallet = {
  privateKey: '1adbba3254ee7c9c7e733ba3592d064846fe55618619c61aa4b1123dbf11c7b5',
  publicKey:'044388a80c36deb312c2c2ece89c9a2e563bcd7d94a735864df8149b571a9ec725c0b39ecfd12de4be4533252431997d033c656c7fbea373c12f9e36d7e69a791a',
  publicKeyHash:'aa882fb58a145cdc1f8f998ef6fe646b7ea27111',
  address:'1GYh21KtrYX5ewZHgKffxwu6WSCGyeAinT',
  privateKeyWIF:'5J27e8Y2VqtHJFvmQc3i56GBcXyrtYtaCzNeRyvfCEUkaU12bYc',
};

export const friendWallet = {
  privateKey: '206ca46fc50158ebd083830aa770ff3eb0fa4233fc40126fa9b551cc3d924450',
  publicKey: '04152cdb8558c9d36d08e1b431eba2320c3199c1cf9fa9d284732dcdfb054b33e4888a30af5541e06bfb81a7f1638087cff37d09bc00cb831b809b09360cf3384e',
  publicKeyHash: 'da06515123a3c0960a4b7964f4fac433b79e1dc1',
  address: '1Lsosn3fnmrwuyhSEUEUbcX41NFrgCErHG',
  privateKeyWIF: '5J4ZpSyZgLzbgfDj8FU2PMxabT4WXcw2gpZR5pdVkWVRU2YMDbo',
};

export async function seedBlocks() {
  console.log('> Seeding db with initial blocks...');

  let blk, header, cbTx, tx, newBlock;
  let result = [ ];
  // first remove all existing blocks in MongoDB
  await BlockModel.find({ }).remove({ });
  // load genesis block first
  blk = new Block({ }, [ ], true);
  blk.findCorrectNonce();
  // save to MongoDB
  newBlock = new BlockModel(blk.getDBFormat());
  await newBlock.save();
  result.push(newBlock);
  console.log('> Genesis block saved: ', newBlock);
  if (process.env.SEED_BLOCKS !== 'true') {
    return [ newBlock ];
  }

  // send 5 BTC to friend wallet
  header = {
    version: 1,
    previousHash: newBlock.hash,
    merkleHash: SHA256(uuid(uuidOptions)),
    difficulty,
    nonce: 0,
    timestamp: new Date('2018-01-01').getTime(),
  };
  cbTx = {
    vin: [ { prevout: 'COINBASE', n: null }],
    vout: [ { scriptPubKey: myWallet.address, nValue: 50 * COIN }]
  };
  tx = {
    vin: [ { prevout: newBlock.txs[0].hash, n: 0, scriptSig: `${myWallet.publicKey} ${unlockTransaction(newBlock.txs[0].hash, myWallet.privateKey)}`}],
    vout: [
      { scriptPubKey: friendWallet.address, nValue: 5 * COIN },
      { scriptPubKey: myWallet.address, nValue: 45 * COIN }
    ]
  };
  blk = new Block(header, [ cbTx, tx ]);
  blk.findCorrectNonce();
  newBlock = new BlockModel(blk.getDBFormat());
  await newBlock.save();
  result.push(newBlock);
  console.log('> Block # 2 saved: ', newBlock.hash);
  ///////////////////////////////////////////////////////
 //
 // create new block where friend gives 2 BTC to my address
 //
 ///////////////////////////////////////////////////////
 header = {
   version: 1,
   previousHash: newBlock.hash,
   merkleHash: SHA256(uuid({...uuidOptions, msecs: new Date('2018-01-02').getTime() })), // we use a random unique ID for now
   difficulty,
   nonce: 0,
   timestamp: new Date('2018-01-02').getTime(),
 };
 cbTx = {
   vin: [ { prevout: "COINBASE", n: null } ],
   vout: [ { scriptPubKey: myWallet.address, nValue: 50 * COIN } ]
 };
 tx = {
   vin: [{
     prevout: newBlock.txs[1].hash, n: 0, scriptSig: `${friendWallet.publicKey} ${unlockTransaction(newBlock.txs[1].hash, friendWallet.privateKey)}`,
   }],
   vout: [
     { scriptPubKey: myWallet.address, nValue: 2 * COIN },
     { scriptPubKey: friendWallet.address, nValue: 3 * COIN }
   ]
 };
 blk = new Block(header, [ cbTx, tx ], false);
 blk.findCorrectNonce();

 newBlock = new BlockModel(blk.getDBFormat());
 await newBlock.save();
 result.push(newBlock);
 console.log('> Block #3 saved: ', newBlock.hash);
 return result;
}
