import base58 from 'bs58';
import coinstring from 'coinstring';
import { ec } from 'elliptic';
import ripemd160 from 'ripemd160';
import secureRandom from 'secure-random';
import sha256 from 'js-sha256';

const ecdsa = new ec('secp256k1');

export function Hash(msg) {
  // 1st perform SHA256 to the Buffer of the hex string
  let hash = sha256(Buffer.from(msg, 'hex'));
  // 2nd perform RIPEMD160 to Buffer of the hash
  return new ripemd160().update(Buffer.from(hash, 'hex')).digest();
}

export function createPublicAddress(publicKeyHash) {
  // step 1 - add prefix "00" in hex
  const step1 = Buffer.from("00" + publicKeyHash, 'hex');
  // step 2 - create SHA256 hash of step 1
  const step2 = sha256(step1);
  // step 3 - create SHA256 hash of step 2
  const step3 = sha256(Buffer.from(step2, 'hex'));
  // step 4 - find the 1st byte of step 3 - save as "checksum"
  const checksum = step3.substring(0, 8);
  // step 5 - add step 1 + checksum
  const step4 = step1.toString('hex') + checksum;
  // return base 58 encoding of step 5
  const address = base58.encode(Buffer.from(step4, 'hex'));
  return address;
}

export function createPrivateKeyWIF(privateKey) {
  const step1 = Buffer.from("80" + privateKey, 'hex');
  const step2 = sha256(step1);
  const step3 = sha256(Buffer.from(step2, 'hex'));
  const checksum = step3.substring(0, 8);
  const step4 = step1.toString('hex') + checksum;
  const privateKeyWIF = base58.encode(Buffer.from(step4, 'hex'));
  return privateKeyWIF;
}

export function makeWallet() {
  let privateKey, publicKey, publicKeyHash, address, privateKeyWIF;
  console.log('> Creating wallet...');
  // create a private key - 256-bit random number 2^256
  privateKey = secureRandom.randomBuffer(32); // 32-byte array <Buffer >
  console.log('> Private key created: ', privateKey.toString('hex'));
  // make sure that the generator private is less than our max number
  // if key is less than the max number, generator a new key (while loop)

  // generate public key from the private key with elliptic curve cryptography
  const keys = ecdsa.keyFromPrivate(privateKey);
  publicKey = keys.getPublic('hex');
  console.log('> Public key created: ', publicKey);
  // generate public key hash - use combination SHA256 (secure hashing algorithm), and RIPEMD160
  publicKeyHash = Hash(publicKey);
  console.log('> Public key hash created: ', publicKeyHash.toString('hex'));

  // public address - adds a prefix ("00") multiple steps that involve hashing with SHA256, getting checksum, and base 58 encoding
  address = createPublicAddress(publicKeyHash.toString('hex'));
  console.log('> Public address created: ', address);

  // generate private key WIF (wallet import format) - adds a prefix ("80"), performs 2 SHA256, calculate checksum, encode in base 58
  privateKeyWIF =  createPrivateKeyWIF(privateKey.toString('hex'));
  console.log('> Private key WIF created: ', privateKeyWIF);

  return {
    privateKey: privateKey.toString('hex'),
    publicKey,
    publicKeyHash: publicKeyHash.toString('hex'),
    address,
    privateKeyWIF,
  };
}
