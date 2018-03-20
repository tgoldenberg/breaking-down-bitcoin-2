import 'babel-polyfill';

import { unlockTransaction, verifyUnlock } from 'utils/verifySignature';

import { blocks } from '__mocks__/blocks';
import { makeWallet } from 'utils/makeWallet';

makeWallet();

let message = "94887ccfc3c07b8747f82a3f1d8f102ac22eaf10c36b8f89193758fb3dbe5bb9";
let privKey = "206ca46fc50158ebd083830aa770ff3eb0fa4233fc40126fa9b551cc3d924450";
console.log('> Signing tx...');
console.log(unlockTransaction(message, privKey));

let address = "1Lsosn3fnmrwuyhSEUEUbcX41NFrgCErHG";
let pubKey = "04152cdb8558c9d36d08e1b431eba2320c3199c1cf9fa9d284732dcdfb054b33e4888a30af5541e06bfb81a7f1638087cff37d09bc00cb831b809b09360cf3384e";
let signature = "3045022100c89d0052968612143ae4d0947efd89b492e4dc1f9d45c3a783a653e11c00f42602200e61c01e29b843d6a783d83a157e32c5d0d6dcc3bc909f2d2ebb162b86a362ab";

console.log('> Verifying tx...');
console.log(verifyUnlock(message, address, pubKey, signature));
