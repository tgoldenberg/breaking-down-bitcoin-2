const COIN = 100000000;

export const myWallet = {
  privateKey: '1adbba3254ee7c9c7e733ba3592d064846fe55618619c61aa4b1123dbf11c7b5',
  publicKey:'044388a80c36deb312c2c2ece89c9a2e563bcd7d94a735864df8149b571a9ec725c0b39ecfd12de4be4533252431997d033c656c7fbea373c12f9e36d7e69a791a',
  publicKeyHash:'aa882fb58a145cdc1f8f998ef6fe646b7ea27111',
  address:'1GYh21KtrYX5ewZHgKffxwu6WSCGyeAinT',
  privateKeyWIF:'5J27e8Y2VqtHJFvmQc3i56GBcXyrtYtaCzNeRyvfCEUkaU12bYc',
};

const friendWallet = {
  privateKey: '206ca46fc50158ebd083830aa770ff3eb0fa4233fc40126fa9b551cc3d924450',
  publicKey: '04152cdb8558c9d36d08e1b431eba2320c3199c1cf9fa9d284732dcdfb054b33e4888a30af5541e06bfb81a7f1638087cff37d09bc00cb831b809b09360cf3384e',
  publicKeyHash: 'da06515123a3c0960a4b7964f4fac433b79e1dc1',
  address: '1Lsosn3fnmrwuyhSEUEUbcX41NFrgCErHG',
  privateKeyWIF: '5J4ZpSyZgLzbgfDj8FU2PMxabT4WXcw2gpZR5pdVkWVRU2YMDbo',
};

let genesisBlock = {
  version: 1,
  previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
  timestamp: 1231006505000,
  difficulty: 22,
  nonce: 2620954,
  hash: '00000244a5bae572247ca9f5b9149fc3980fa90a7a70cd35030a29d81ebc88ea',
  blocksize: 441,
  txs: [
    {
      hash: '892d3a0a01ab1a1c3d67e1592e5bd11df687e26098dda08478e6a58e0f6b337a',
      vin: [ { prevout: 'COINBASE', n: null }],
      vout: [ { value: 50 * COIN, scriptPubKey: myWallet.address } ],
    },
  ]
};

let block2 = {
  version: 1,
  previousHash: genesisBlock.hash,
  timestamp: 1520947111852,
  difficulty: 22,
  nonce: 210212,
  hash: '000001a20dacb2ede72eb4b35dea74b83fd4bc0b23849b789fee19c7eac2f1b9',
  blocksize: 225,
  txs: [
    {
      hash: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
      vin: [ { prevout: 'COINBASE', n: null }],
      vout: [ { value: 50 * COIN, scriptPubKey: myWallet.address } ],
    },
    {
      // ADD TX to send money to friend
      hash: '94887ccfc3c07b8747f82a3f1d8f102ac22eaf10c36b8f89193758fb3dbe5bb9',
      vin: [ { prevout: '892d3a0a01ab1a1c3d67e1592e5bd11df687e26098dda08478e6a58e0f6b337a', n: 0, scriptSig: `${myWallet.publicKey} 3045022100d559357308e21c9847dd824870a868eb67070718897211e458b99b56849dc80b0220049e6f6b31ef3d0531141a43b6a8c41cb3233a0a1d787c41dfc510b0c84a2d18`}],
      vout: [
        { value: 25 * COIN, scriptPubKey: friendWallet.address },
        { value: 25 * COIN, scriptPubKey: myWallet.address },
      ],
    }
  ],
};

let block3 = {
  version: 1,
  previousHash: block2.hash,
  timestamp: 1520948119344,
  difficulty: 22,
  nonce: 6317304,
  hash: '00000369dd0974cb0a472a961247607c196e6353c3ea04746b9bde3272b7de6a',
  blocksize: 225,
  // FILL IN TXS
  txs: [
    {
      hash: '50c7f88c5fac2b14b5a927fc2753107a37b419ac712c38c4b98c1a9f850484e7',
      vin: [ { prevout: 'COINBASE', n: null }],
      vout: [ { value: 50 * COIN, scriptPubKey: myWallet.address } ],
    },
    {
      hash: '7734af44e08d1b693f3fa65f9621acec990bc23221071089ba5f94ebdcbb8963',
      vin: [ { prevout: '94887ccfc3c07b8747f82a3f1d8f102ac22eaf10c36b8f89193758fb3dbe5bb9', n: 0, scriptSig: `${friendWallet} 3045022100c89d0052968612143ae4d0947efd89b492e4dc1f9d45c3a783a653e11c00f42602200e61c01e29b843d6a783d83a157e32c5d0d6dcc3bc909f2d2ebb162b86a362ab` }],
      vout: [
        { value: 5 * COIN, scriptPubKey: myWallet.address },
        { value: 20 * COIN, scriptPubKey: friendWallet },
      ]
    }
  ]
};

export const blocks = [ genesisBlock, block2, block3 ];
