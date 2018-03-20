/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./__mocks__/blocks.js":
/*!*****************************!*\
  !*** ./__mocks__/blocks.js ***!
  \*****************************/
/*! exports provided: myWallet, blocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"myWallet\", function() { return myWallet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blocks\", function() { return blocks; });\nconst COIN = 100000000;\n\nconst myWallet = {\n  privateKey: '1adbba3254ee7c9c7e733ba3592d064846fe55618619c61aa4b1123dbf11c7b5',\n  publicKey: '044388a80c36deb312c2c2ece89c9a2e563bcd7d94a735864df8149b571a9ec725c0b39ecfd12de4be4533252431997d033c656c7fbea373c12f9e36d7e69a791a',\n  publicKeyHash: 'aa882fb58a145cdc1f8f998ef6fe646b7ea27111',\n  address: '1GYh21KtrYX5ewZHgKffxwu6WSCGyeAinT',\n  privateKeyWIF: '5J27e8Y2VqtHJFvmQc3i56GBcXyrtYtaCzNeRyvfCEUkaU12bYc'\n};\n\nconst friendWallet = {\n  privateKey: '206ca46fc50158ebd083830aa770ff3eb0fa4233fc40126fa9b551cc3d924450',\n  publicKey: '04152cdb8558c9d36d08e1b431eba2320c3199c1cf9fa9d284732dcdfb054b33e4888a30af5541e06bfb81a7f1638087cff37d09bc00cb831b809b09360cf3384e',\n  publicKeyHash: 'da06515123a3c0960a4b7964f4fac433b79e1dc1',\n  address: '1Lsosn3fnmrwuyhSEUEUbcX41NFrgCErHG',\n  privateKeyWIF: '5J4ZpSyZgLzbgfDj8FU2PMxabT4WXcw2gpZR5pdVkWVRU2YMDbo'\n};\n\nlet genesisBlock = {\n  version: 1,\n  previousHash: '0000000000000000000000000000000000000000000000000000000000000000',\n  timestamp: 1231006505000,\n  difficulty: 22,\n  nonce: 2620954,\n  hash: '00000244a5bae572247ca9f5b9149fc3980fa90a7a70cd35030a29d81ebc88ea',\n  blocksize: 441,\n  txs: [{\n    hash: '892d3a0a01ab1a1c3d67e1592e5bd11df687e26098dda08478e6a58e0f6b337a',\n    vin: [{ prevout: 'COINBASE', n: null }],\n    vout: [{ value: 50 * COIN, scriptPubKey: myWallet.address }]\n  }]\n};\n\nlet block2 = {\n  version: 1,\n  previousHash: genesisBlock.hash,\n  timestamp: 1520947111852,\n  difficulty: 22,\n  nonce: 210212,\n  hash: '000001a20dacb2ede72eb4b35dea74b83fd4bc0b23849b789fee19c7eac2f1b9',\n  blocksize: 225,\n  txs: [{\n    hash: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',\n    vin: [{ prevout: 'COINBASE', n: null }],\n    vout: [{ value: 50 * COIN, scriptPubKey: myWallet.address }]\n  }, {\n    // ADD TX to send money to friend\n    hash: '94887ccfc3c07b8747f82a3f1d8f102ac22eaf10c36b8f89193758fb3dbe5bb9',\n    vin: [{ prevout: '892d3a0a01ab1a1c3d67e1592e5bd11df687e26098dda08478e6a58e0f6b337a', n: 0, scriptSig: `${myWallet.publicKey} 3045022100d559357308e21c9847dd824870a868eb67070718897211e458b99b56849dc80b0220049e6f6b31ef3d0531141a43b6a8c41cb3233a0a1d787c41dfc510b0c84a2d18` }],\n    vout: [{ value: 25 * COIN, scriptPubKey: friendWallet.address }, { value: 25 * COIN, scriptPubKey: myWallet.address }]\n  }]\n};\n\nlet block3 = {\n  version: 1,\n  previousHash: block2.hash,\n  timestamp: 1520948119344,\n  difficulty: 22,\n  nonce: 6317304,\n  hash: '00000369dd0974cb0a472a961247607c196e6353c3ea04746b9bde3272b7de6a',\n  blocksize: 225,\n  // FILL IN TXS\n  txs: [{\n    hash: '50c7f88c5fac2b14b5a927fc2753107a37b419ac712c38c4b98c1a9f850484e7',\n    vin: [{ prevout: 'COINBASE', n: null }],\n    vout: [{ value: 50 * COIN, scriptPubKey: myWallet.address }]\n  }, {\n    hash: '7734af44e08d1b693f3fa65f9621acec990bc23221071089ba5f94ebdcbb8963',\n    vin: [{ prevout: '94887ccfc3c07b8747f82a3f1d8f102ac22eaf10c36b8f89193758fb3dbe5bb9', n: 0, scriptSig: `${friendWallet} 3045022100c89d0052968612143ae4d0947efd89b492e4dc1f9d45c3a783a653e11c00f42602200e61c01e29b843d6a783d83a157e32c5d0d6dcc3bc909f2d2ebb162b86a362ab` }],\n    vout: [{ value: 5 * COIN, scriptPubKey: myWallet.address }, { value: 20 * COIN, scriptPubKey: friendWallet }]\n  }]\n};\n\nconst blocks = [genesisBlock, block2, block3];\n\n//# sourceURL=webpack:///./__mocks__/blocks.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-polyfill */ \"babel-polyfill\");\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_verifySignature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/verifySignature */ \"./src/utils/verifySignature.js\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var pusher_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pusher-js */ \"pusher-js\");\n/* harmony import */ var pusher_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pusher_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mocks_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../__mocks__/blocks */ \"./__mocks__/blocks.js\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _utils_makeWallet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/makeWallet */ \"./src/utils/makeWallet.js\");\n/* harmony import */ var net__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! net */ \"net\");\n/* harmony import */ var net__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(net__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var network__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! network */ \"network\");\n/* harmony import */ var network__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(network__WEBPACK_IMPORTED_MODULE_8__);\nlet handleConnection = (() => {\n  var _ref3 = _asyncToGenerator(function* (conn) {\n    console.log('> New client connection from : ', conn.remoteAddress, conn.remotePort);\n    conn.setEncoding('utf8');\n    conn.on('data', function (data) {\n      console.log('> Received data: ', data);\n    });\n  });\n\n  return function handleConnection(_x2) {\n    return _ref3.apply(this, arguments);\n  };\n})();\n\nlet connectWithPeer = (() => {\n  var _ref4 = _asyncToGenerator(function* (ip, port) {\n    const client = new net__WEBPACK_IMPORTED_MODULE_7___default.a.Socket();\n\n    client.connect(port, ip, function () {\n      console.log('> Connected to peer: ', ip, port);\n      client.write('VERSION 1 00000244a5bae572247ca9f5b9149fc3980fa90a7a70cd35030a29d81ebc88ea');\n    });\n  });\n\n  return function connectWithPeer(_x3, _x4) {\n    return _ref4.apply(this, arguments);\n  };\n})();\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst PUSHER_APP_KEY = '86e36fb6cb404d67a108';\nconst MAX_PEERS = 25;\n\nconst app = express__WEBPACK_IMPORTED_MODULE_2___default()();\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_5___default.a.urlencoded({ extended: false }));\n\napp.listen(process.env.PORT || 3000, _asyncToGenerator(function* () {\n  console.log('> App server running on port: ', process.env.PORT);\n  // get public IP address\n  const ipAddr = yield getIPAddress();\n  // connect to Pusher server and get list of connected IP addresses\n  const pusher = new pusher_js__WEBPACK_IMPORTED_MODULE_3___default.a(PUSHER_APP_KEY, {\n    auth: { params: { ip_addr: ipAddr, port: 8334 } },\n    cluster: 'us2',\n    // authEndpoint: 'http://localhost:3001/pusher/auth',\n    authEndpoint: 'https://pusher-presence-auth.herokuapp.com/pusher/auth',\n    encrypted: true\n  });\n\n  const channel = pusher.subscribe('presence-node-coin');\n\n  channel.bind('pusher:subscription_succeeded', (() => {\n    var _ref2 = _asyncToGenerator(function* (members) {\n      console.log('> pusher:subscription_succeeded: ', members);\n      let peers = [];\n      channel.members.each(function ({ id }) {\n        if (id !== ipAddr) {\n          peers.push(id);\n        }\n      });\n      // only connect to a max of 25 peers\n      for (let i = 0; i < Math.min(MAX_PEERS, peers.length); i++) {\n        // connect with peer\n        yield connectWithPeer(peers[i], 8334);\n      }\n    });\n\n    return function (_x) {\n      return _ref2.apply(this, arguments);\n    };\n  })());\n\n  // for each node, establish TCP/IP connection and send VERSION message\n  const tcpServer = net__WEBPACK_IMPORTED_MODULE_7___default.a.createServer();\n  tcpServer.on('connection', handleConnection);\n  tcpServer.listen(8334, '0.0.0.0', function () {\n    console.log('> TCP/IP server listening on: ', tcpServer.address());\n  });\n}));\n\nfunction getIPAddress() {\n  return new Promise((resolve, reject) => {\n    network__WEBPACK_IMPORTED_MODULE_8___default.a.get_public_ip((err, ip) => {\n      if (err) {\n        reject(err);\n      }\n      resolve(ip);\n    });\n  });\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/makeWallet.js":
/*!*********************************!*\
  !*** ./src/utils/makeWallet.js ***!
  \*********************************/
/*! exports provided: Hash, createPublicAddress, createPrivateKeyWIF, makeWallet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hash\", function() { return Hash; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createPublicAddress\", function() { return createPublicAddress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createPrivateKeyWIF\", function() { return createPrivateKeyWIF; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeWallet\", function() { return makeWallet; });\n/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bs58 */ \"bs58\");\n/* harmony import */ var bs58__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bs58__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var coinstring__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! coinstring */ \"coinstring\");\n/* harmony import */ var coinstring__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(coinstring__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! elliptic */ \"elliptic\");\n/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(elliptic__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ripemd160__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ripemd160 */ \"ripemd160\");\n/* harmony import */ var ripemd160__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ripemd160__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var secure_random__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! secure-random */ \"secure-random\");\n/* harmony import */ var secure_random__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(secure_random__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! js-sha256 */ \"js-sha256\");\n/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(js_sha256__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n\nconst ecdsa = new elliptic__WEBPACK_IMPORTED_MODULE_2__[\"ec\"]('secp256k1');\n\nfunction Hash(msg) {\n  // 1st perform SHA256 to the Buffer of the hex string\n  let hash = js_sha256__WEBPACK_IMPORTED_MODULE_5___default()(Buffer.from(msg, 'hex'));\n  // 2nd perform RIPEMD160 to Buffer of the hash\n  return new ripemd160__WEBPACK_IMPORTED_MODULE_3___default.a().update(Buffer.from(hash, 'hex')).digest();\n}\n\nfunction createPublicAddress(publicKeyHash) {\n  // step 1 - add prefix \"00\" in hex\n  const step1 = Buffer.from(\"00\" + publicKeyHash, 'hex');\n  // step 2 - create SHA256 hash of step 1\n  const step2 = js_sha256__WEBPACK_IMPORTED_MODULE_5___default()(step1);\n  // step 3 - create SHA256 hash of step 2\n  const step3 = js_sha256__WEBPACK_IMPORTED_MODULE_5___default()(Buffer.from(step2, 'hex'));\n  // step 4 - find the 1st byte of step 3 - save as \"checksum\"\n  const checksum = step3.substring(0, 8);\n  // step 5 - add step 1 + checksum\n  const step4 = step1.toString('hex') + checksum;\n  // return base 58 encoding of step 5\n  const address = bs58__WEBPACK_IMPORTED_MODULE_0___default.a.encode(Buffer.from(step4, 'hex'));\n  return address;\n}\n\nfunction createPrivateKeyWIF(privateKey) {\n  const step1 = Buffer.from(\"80\" + privateKey, 'hex');\n  const step2 = js_sha256__WEBPACK_IMPORTED_MODULE_5___default()(step1);\n  const step3 = js_sha256__WEBPACK_IMPORTED_MODULE_5___default()(Buffer.from(step2, 'hex'));\n  const checksum = step3.substring(0, 8);\n  const step4 = step1.toString('hex') + checksum;\n  const privateKeyWIF = bs58__WEBPACK_IMPORTED_MODULE_0___default.a.encode(Buffer.from(step4, 'hex'));\n  return privateKeyWIF;\n}\n\nfunction makeWallet() {\n  let privateKey, publicKey, publicKeyHash, address, privateKeyWIF;\n  console.log('> Creating wallet...');\n  // create a private key - 256-bit random number 2^256\n  privateKey = secure_random__WEBPACK_IMPORTED_MODULE_4___default.a.randomBuffer(32); // 32-byte array <Buffer >\n  console.log('> Private key created: ', privateKey.toString('hex'));\n  // make sure that the generator private is less than our max number\n  // if key is less than the max number, generator a new key (while loop)\n\n  // generate public key from the private key with elliptic curve cryptography\n  const keys = ecdsa.keyFromPrivate(privateKey);\n  publicKey = keys.getPublic('hex');\n  console.log('> Public key created: ', publicKey);\n  // generate public key hash - use combination SHA256 (secure hashing algorithm), and RIPEMD160\n  publicKeyHash = Hash(publicKey);\n  console.log('> Public key hash created: ', publicKeyHash.toString('hex'));\n\n  // public address - adds a prefix (\"00\") multiple steps that involve hashing with SHA256, getting checksum, and base 58 encoding\n  address = createPublicAddress(publicKeyHash.toString('hex'));\n  console.log('> Public address created: ', address);\n\n  // generate private key WIF (wallet import format) - adds a prefix (\"80\"), performs 2 SHA256, calculate checksum, encode in base 58\n  privateKeyWIF = createPrivateKeyWIF(privateKey.toString('hex'));\n  console.log('> Private key WIF created: ', privateKeyWIF);\n\n  return {\n    privateKey: privateKey.toString('hex'),\n    publicKey,\n    publicKeyHash: publicKeyHash.toString('hex'),\n    address,\n    privateKeyWIF\n  };\n}\n\n//# sourceURL=webpack:///./src/utils/makeWallet.js?");

/***/ }),

/***/ "./src/utils/verifySignature.js":
/*!**************************************!*\
  !*** ./src/utils/verifySignature.js ***!
  \**************************************/
/*! exports provided: Hash, unlockTransaction, verifyUnlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Hash\", function() { return Hash; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unlockTransaction\", function() { return unlockTransaction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verifyUnlock\", function() { return verifyUnlock; });\n/* harmony import */ var _makeWallet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makeWallet */ \"./src/utils/makeWallet.js\");\n/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! elliptic */ \"elliptic\");\n/* harmony import */ var elliptic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(elliptic__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ripemd160__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ripemd160 */ \"ripemd160\");\n/* harmony import */ var ripemd160__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ripemd160__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! js-sha256 */ \"js-sha256\");\n/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(js_sha256__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\nconst COIN = 100000000;\nconst ecdsa = new elliptic__WEBPACK_IMPORTED_MODULE_1__[\"ec\"]('secp256k1');\n\n/*\n  TX\n{\n    hash: SHA256(vin, vout serialized + block hash),\n    // where is money coming from ?\n    vin: [\n      // input 1 (5 BTC)\n      // input 2 (5 BTC)\n      {\n        prevout: 'hash of Tx that is referring to'\n        n: 'index of vout'\n        scriptSig: 'signature + public key'\n      }\n    ],\n    // where is money going to ?\n    vout: [\n      // output 1 - 6 BTC to friend\n      // output 2 - 4 BTC to self\n      {\n        value: 6 * COIN,\n        scriptPubKey: 'address of recipient | public key hash',\n      }\n    ],\n}\n\n*/\n\nfunction Hash(msg) {\n  // derive SHA-256 hash and then RIPEMD-160 hash of that\n  return new ripemd160__WEBPACK_IMPORTED_MODULE_2___default.a().update(js_sha256__WEBPACK_IMPORTED_MODULE_3___default()(msg)).digest('hex');\n}\n\nfunction unlockTransaction(msg, privateKey) {\n  try {\n    // hash txid\n    const hash = Hash(msg);\n    // initialize keys\n    const keys = ecdsa.keyFromPrivate(privateKey, 'hex');\n    // sign msg with private key\n    const signature = ecdsa.sign(hash, keys);\n    // return in serialized format\n    return signature.toDER('hex');\n  } catch (e) {\n    console.warn(e);\n    return null;\n  }\n}\n\nfunction createPubKeyHash(publicKey) {\n  // 1st perform SHA256 to the Buffer of the hex string\n  let hash = js_sha256__WEBPACK_IMPORTED_MODULE_3___default()(Buffer.from(publicKey, 'hex'));\n  // 2nd perform RIPEMD160 to Buffer of the hash\n  return new ripemd160__WEBPACK_IMPORTED_MODULE_2___default.a().update(Buffer.from(hash, 'hex')).digest('hex');\n}\n\nfunction verifyUnlock(msg, address, publicKey, signature) {\n  try {\n    // verify that public address matches public key\n    console.log('> verify unlock params: ', msg, address, publicKey, signature);\n    const publicKeyHash = createPubKeyHash(publicKey);\n    console.log('> Pub key hash: ', publicKeyHash);\n    const isAddress = Object(_makeWallet__WEBPACK_IMPORTED_MODULE_0__[\"createPublicAddress\"])(publicKeyHash) === address;\n    if (!isAddress) {\n      console.log('> wrong address: ', isAddress);\n      return false;\n    }\n    const hash = Hash(msg);\n    const keys = ecdsa.keyFromPublic(publicKey, 'hex');\n    const isValid = keys.verify(hash, signature);\n    return isValid;\n  } catch (e) {\n    console.warn(e);\n    return false;\n  }\n}\n\n//# sourceURL=webpack:///./src/utils/verifySignature.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "bs58":
/*!***********************!*\
  !*** external "bs58" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bs58\");\n\n//# sourceURL=webpack:///external_%22bs58%22?");

/***/ }),

/***/ "coinstring":
/*!*****************************!*\
  !*** external "coinstring" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"coinstring\");\n\n//# sourceURL=webpack:///external_%22coinstring%22?");

/***/ }),

/***/ "elliptic":
/*!***************************!*\
  !*** external "elliptic" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"elliptic\");\n\n//# sourceURL=webpack:///external_%22elliptic%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "js-sha256":
/*!****************************!*\
  !*** external "js-sha256" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"js-sha256\");\n\n//# sourceURL=webpack:///external_%22js-sha256%22?");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"net\");\n\n//# sourceURL=webpack:///external_%22net%22?");

/***/ }),

/***/ "network":
/*!**************************!*\
  !*** external "network" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"network\");\n\n//# sourceURL=webpack:///external_%22network%22?");

/***/ }),

/***/ "pusher-js":
/*!****************************!*\
  !*** external "pusher-js" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pusher-js\");\n\n//# sourceURL=webpack:///external_%22pusher-js%22?");

/***/ }),

/***/ "ripemd160":
/*!****************************!*\
  !*** external "ripemd160" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ripemd160\");\n\n//# sourceURL=webpack:///external_%22ripemd160%22?");

/***/ }),

/***/ "secure-random":
/*!********************************!*\
  !*** external "secure-random" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"secure-random\");\n\n//# sourceURL=webpack:///external_%22secure-random%22?");

/***/ })

/******/ });