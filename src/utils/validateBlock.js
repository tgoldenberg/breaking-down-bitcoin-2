import BlockModel from 'models/Block';
import find from 'lodash/find';
import { verifyUnlock } from 'utils/verifySignature';

const COIN = 100000000;
const COINBASE_REWARD = 50 * COIN;

export async function areBlocksValid(blocks) {
  if (!blocks.length) {
    return false;
  }
  // loop through each block and check that is valid
  for (let i = 0; i < blocks.length; i++) {
    const isValid = await isBlockValid(blocks[i], blocks[i-1], i === 0);
    if (!isValid) {
      return false;
    }
  }
  return true;
}

export async function isBlockValid(block, prevBlock, isGenesis) {
  // check that all transactions are valid
  const { txs } = block;
  for (let i = 0; i < txs.length; i++) {
    const isValid = await isTxValid(txs[i]);
    if (!isValid) {
      console.log('> Invalid tx: ', txs[i]);
      return false;
    }
  }
  // check mining - that nonce is correctly calculated
  const target = Math.pow(2, 256 - block.difficulty);
  if (parseInt(block.hash, 16) > target) {
    console.log('> Incorrect nonce: ', block.hash);
    return false;
  }
  // check that previousHash is correct (special case for genesis block)
  if (!isGenesis && block.previousHash !== prevBlock.hash) {
    console.log('> Incorrect prev hash: ', prevBlock.hash, block);
    return false;
  }
  return true;
}

export async function isTxValid(tx) {
  // verify inputs and outputs ("vin" and "vout")
  if (!tx.vin || !tx.vin.length || !tx.vout || !tx.vout.length) {
    return false;
  }
  let txinValue = 0;
  let txoutValue = 0;
  // check inputs
  for (let i = 0; i < tx.vin.length; i++) {
    const txin = tx.vin[i];
    if (txin.prevout === 'COINBASE') {
      // make sure only one coinbase tx
      if (tx.vout.length > 1 || tx.vin.length > 1 || tx.vout[i].nValue > COINBASE_REWARD) {
        return false;
      }
      return true;
    }
    // validate regular input
    let prevTxBlock = await BlockModel.findOne({ 'txs.hash': txin.prevout });
    if (!prevTxBlock) {
      return false;
    }
    let prevTx = find(prevTxBlock.txs, ({ hash }) => hash === txin.prevout);
    if (!prevTx) {
      return false;
    }
    txinValue += prevTx.vout[txin.n].nValue;
    // ensure that is not double spent in multiple txs
    let alreadySpentTxs = await BlockModel.find({ 'txs.vin.prevout': txin.prevout });
    if (alreadySpentTxs.length > 1) {
      return false;
    }
    // verify signature
    let publicKeyScript = prevTx.vout[txin.n].scriptPubKey;
    let txid = prevTx.hash;
    let [ publicKey, scriptSig ] = txin.scriptSig.split(' ');
    let isVerified = verifyUnlock(txid, prevTx.vout[txin.n].scriptPubKey, publicKey, scriptSig);
    if (!isVerified) {
      return false;
    }
  }
  // check transaction outputs
  for (let i = 0; i < tx.vout.length; i++) {
    let txout = tx.vout[i];
    if (typeof txout.nValue !== 'number' || typeof txout.scriptPubKey !== 'string') {
      return false;
    }
    txoutValue += txout.nValue;
  }
  // check that input value is not greater than the output value
  let totalFees = txinValue - txoutValue;
  if (totalFees < 0) {
    return false;
  }
  return true;
}
