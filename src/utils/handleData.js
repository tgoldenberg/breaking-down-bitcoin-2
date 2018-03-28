export const DL = `~~~~~`;

export async function handleData(data) {
  // message type, arguments
  const [ messageType, ...args ] = data.split(DL);
  console.log('> New message: ', messageType, args);
  switch(messageType) {
    case 'VERSION':
      // check if version is compatible
      // check if peer has more blocks - send GETBLOCKS response
      // if isServer = true, send response VERSION message
      break;
    case 'GETBLOCKS':
      // scan to see if we have blocks after the hash provided
      // if we do, send a BLOCKHEADERS response with list of block hashes
      break;
    case 'BLOCKHEADERS':
      // ~50 hashes, distribute among peers
      // response with REQUESTBLOCK
      break;
    case 'REQUESTBLOCK':
      // we check if we have the requested block, serialize and response with SENDBLOCK message
      break;
    case 'SENDBLOCK':
      // validate block and its transactions
      // if is valid, add to MongoDB, update lastBlock
      break;
  }
}
