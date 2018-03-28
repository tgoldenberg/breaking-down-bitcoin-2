import { createPublicAddress } from 'utils/makeWallet';
import { ec } from 'elliptic';
import ripemd160 from 'ripemd160';
import sha256 from 'js-sha256';

const COIN = 100000000;
const ecdsa = new ec('secp256k1');

/*
  TX
{
    hash: SHA256(vin, vout serialized + block hash),
    // where is money coming from ?
    vin: [
      // input 1 (5 BTC)
      // input 2 (5 BTC)
      {
        prevout: 'hash of Tx that is referring to'
        n: 'index of vout'
        scriptSig: 'signature + public key'
      }
    ],
    // where is money going to ?
    vout: [
      // output 1 - 6 BTC to friend
      // output 2 - 4 BTC to self
      {
        value: 6 * COIN,
        scriptPubKey: 'address of recipient | public key hash',
      }
    ],
}

*/

export function Hash(msg) {
  // derive SHA-256 hash and then RIPEMD-160 hash of that
  return new ripemd160().update(sha256(msg)).digest('hex');
}

export function unlockTransaction(msg, privateKey) {
  try {
    // hash txid
    const hash = Hash(msg);
    // initialize keys
    const keys = ecdsa.keyFromPrivate(privateKey, 'hex');
    // sign msg with private key
    const signature = ecdsa.sign(hash, keys);
    // return in serialized format
    return signature.toDER('hex');
  } catch (e) {
    console.warn(e);
    return null;
  }
}

function createPubKeyHash(publicKey) {
  // 1st perform SHA256 to the Buffer of the hex string
  let hash = sha256(Buffer.from(publicKey, 'hex'));
  // 2nd perform RIPEMD160 to Buffer of the hash
  return new ripemd160().update(Buffer.from(hash, 'hex')).digest('hex');
}

export function verifyUnlock(msg, address, publicKey, signature) {
  try {
    // verify that public address matches public key
    // console.log('> verify unlock params: ', msg, address, publicKey, signature);
    const publicKeyHash = createPubKeyHash(publicKey);
    // console.log('> Pub key hash: ', publicKeyHash);
    const isAddress = createPublicAddress(publicKeyHash) === address;
    if (!isAddress) {
      console.log('> wrong address: ', isAddress);
      return false;
    }
    const hash = Hash(msg);
    const keys = ecdsa.keyFromPublic(publicKey, 'hex');
    const isValid = keys.verify(hash, signature);
    return isValid;
  } catch (e) {
    console.warn(e);
    return false;
  }
}
