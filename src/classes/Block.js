import SHA256 from 'js-sha256';

const GENESIS_HEADER = {
  version: 1,
  previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleHash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
  difficulty: 22,
  nonce: 2620954,
  timestamp: 1231006505000,
};

const COIN = 100000000;

const GENESIS_TX = {
  vin: [
    { prevout: "COINBASE", n: null }
  ],
  vout: [
    {
      scriptPubKey: "1GYh21KtrYX5ewZHgKffxwu6WSCGyeAinT",
      nValue: 50 * COIN
     }
  ]
}

export default class Block {
  constructor(header, txs, isGenesis = false) {
    this.header = isGenesis ? GENESIS_HEADER: header;
    this.hash = this.getBlockHash(this.header, this.header.nonce);
    txs = isGenesis ? [ GENESIS_TX ] : txs;
    this.txs = [ ];
    for (let i = 0; i < txs.length; i++) {
      this.addTransaction(txs[i]);
    }
    this.setBlocksize();
    console.log(this);
  }
  getBlockHash(header, nonce) {
    return SHA256('' + header.version + header.previousHash + header.merkleHash + header.timestamp + header.difficulty + nonce);
  }
  getDBFormat() {
    return {
      hash: this.hash,
      version: this.header.version,
      previousHash: this.header.previousHash,
      merkleHash: this.header.merkleHash,
      timestamp: this.header.timestamp,
      difficulty: this.header.difficulty,
      nonce: this.header.nonce,
      txs: this.txs,
      blocksize: this.blocksize,
    };
  }
  addTransaction(tx) {
    let txid = SHA256(this.hash + JSON.stringify({ vin: tx.vin, vout: tx.vout }));
    this.txs.push({ ...tx, hash: txid });
    return this.txs;
  }
  setHeader(header) {
    this.header = header;
    this.hash = this.getBlockHash(this.header, this.header.nonce);
    this.adjustTxids();
  }
  setBlocksize() {
    this.blocksize = JSON.stringify(this).length;
  }
  adjustTxids() {
    let newTxs = [ ];
    for (let i = 0; i < this.txs.length; i++) {
      let tx = this.txs[i];
      let txid = SHA256(this.hash + JSON.stringify({ vin: tx.vin, vout: tx.vout }));
      newTxs.push({ ...tx, hash: txid });
    }
    this.txs = newTxs;
  }
  setNonce(nonce) {
    this.header.nonce = nonce;
    this.hash = this.getBlockHash(this.header, nonce);
  }
  findCorrectNonce() {
    // find correct nonce
    const target = Math.pow(2, 256 - this.header.difficulty);
    let nonce = this.header.nonce;

    console.log('> Solving for block nonce...', this.header, this.hash);
    while (parseInt(this.getBlockHash(this.header, nonce), 16) > target) {
      if (nonce % 1000000 === 0) {
        console.log('> New nonce: ', nonce, this.getBlockHash(this.header, nonce));
      }
      nonce++;
    }
    this.setNonce(nonce);
    this.adjustTxids();
    return this.header.nonce;
  }
}
