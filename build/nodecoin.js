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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babel-polyfill */ \"babel-polyfill\");\n/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_makeWallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/makeWallet */ \"./src/utils/makeWallet.js\");\n\n\n\n\nObject(_utils_makeWallet__WEBPACK_IMPORTED_MODULE_1__[\"makeWallet\"])();\n\n//# sourceURL=webpack:///./src/index.js?");

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

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

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

/***/ "js-sha256":
/*!****************************!*\
  !*** external "js-sha256" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"js-sha256\");\n\n//# sourceURL=webpack:///external_%22js-sha256%22?");

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