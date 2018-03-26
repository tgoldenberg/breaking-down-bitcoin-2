import 'babel-polyfill';

import { unlockTransaction, verifyUnlock } from 'utils/verifySignature';

import BlockModel from 'models/Block';
import Express from 'express';
import Pusher from 'pusher-js';
import { blocks } from '__mocks__/blocks';
import bodyParser from 'body-parser';
import { connectToDB } from 'db/connectToDB';
import { makeWallet } from 'utils/makeWallet';
import net from 'net';
import network from 'network';
import store from 'store/store';

const PUSHER_APP_KEY = '86e36fb6cb404d67a108';
const MAX_PEERS = 25;

const app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT || 3000, async function() {
  console.log('> App server running on port: ', process.env.PORT);
  // sync to MongoDB
  const connectedToDB = await connectToDB();
  console.log('> Successfully connected to local MongoDB: ', connectedToDB);
  // load blocks
  let blocks = await BlockModel.find({ });
  console.log('> Saved blocks: ', blocks);
  // call SET_INITIAL_BLOCKS

  // get public IP address
  const ipAddr = await getIPAddress();
  // connect to Pusher server and get list of connected IP addresses
  const pusher = new Pusher(PUSHER_APP_KEY, {
    auth: { params: { ip_addr: ipAddr, port: 8334 } },
    cluster: 'us2',
    // authEndpoint: 'http://localhost:3001/pusher/auth',
    authEndpoint: 'https://pusher-presence-auth.herokuapp.com/pusher/auth',
    encrypted: true,
  });

  const channel = pusher.subscribe('presence-node-coin');

  channel.bind('pusher:subscription_succeeded', async (members) => {
    console.log('> pusher:subscription_succeeded: ', members);
    let peers = [ ];
    channel.members.each(({ id }) => {
      if (id !== ipAddr) {
        peers.push(id);
      }
    });
    // only connect to a max of 25 peers
    for (let i = 0; i < Math.min(MAX_PEERS, peers.length); i++) {
      // connect with peer
      await connectWithPeer(peers[i], 8334);
    }
  });

  // for each node, establish TCP/IP connection and send VERSION message
  const tcpServer = net.createServer();
  tcpServer.on('connection', handleConnection);
  tcpServer.listen(8334, '0.0.0.0', () => {
    console.log('> TCP/IP server listening on: ', tcpServer.address());
  });
});

async function handleConnection(conn) {
  console.log('> New client connection from : ', conn.remoteAddress, conn.remotePort);
  conn.setEncoding('utf8');
  conn.on('data', data => {
    console.log('> Received data: ', data);
  });
}

async function connectWithPeer(ip, port) {
  const client = new net.Socket();

  client.connect(port, ip, () => {
    console.log('> Connected to peer: ', ip, port);
    client.write('VERSION 1 00000244a5bae572247ca9f5b9149fc3980fa90a7a70cd35030a29d81ebc88ea');
  })
}

function getIPAddress() {
  return new Promise((resolve, reject) => {
    network.get_public_ip((err, ip) => {
      if (err) {
        reject(err);
      }
      resolve(ip);
    });
  });
}
