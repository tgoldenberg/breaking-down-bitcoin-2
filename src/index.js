import 'babel-polyfill';

import { DL, handleData } from 'utils/handleData';
import { unlockTransaction, verifyUnlock } from 'utils/verifySignature';

import BlockModel from 'models/Block';
import Express from 'express';
import Pusher from 'pusher-js';
import { areBlocksValid } from 'utils/validateBlock';
import { blocks } from '__mocks__/blocks';
import bodyParser from 'body-parser';
import { connectToDB } from 'db/connectToDB';
import find from 'lodash/find';
import { makeWallet } from 'utils/makeWallet';
import net from 'net';
import network from 'network';
import { seedBlocks } from '__mocks__/seedBlocks';
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
  // console.log('> Saved blocks: ', blocks);
  const valid = await areBlocksValid(blocks);
  console.log('> Valid blocks: ', blocks.length);
  if (!valid) {
    blocks = await seedBlocks();
    console.log('> Blocks: ', blocks);
  }
  // call SET_INITIAL_BLOCKS
  store.dispatch({ type: 'SET_INITIAL_BLOCKS', blocks });

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
    console.log('> pusher:subscription_succeeded: '.gray, members);
    let peers = [ ];
    channel.members.each(({ id }) => {
      if (id !== ipAddr) {
        peers.push(id);
      }
    });
    store.dispatch({ type: 'SET_PEERS', allPeers: peers.slice(0, MAX_PEERS) });
    // only connect to a max of 25 peers
    for (let i = 0; i < Math.min(MAX_PEERS, peers.length); i++) {
      // connect with peer
      await connectWithPeer(peers[i], 8334);
    }
  });

  // MEMBER REMOVED
  channel.bind('pusher:member_removed', function(member) {
    console.log('> pusher:member_removed: '.gray, member);
    let allPeers = store.getState().allPeers;
    let newAllPeers = [ ];
    allPeers.forEach(peer => {
      if (peer.ip !== member.id) {
        newAllPeers.push(peer);
      }
    });
    store.dispatch({ type: 'SET_PEERS', allPeers: newAllPeers });
  });

  // MEMBER ADDED
  channel.bind('pusher:member_added', function(member) {
    console.log('> pusher:member_added: '.gray, member);
    let allPeers = store.getState().allPeers;
    allPeers.push({ ip: member.id, connected: false, client: null, synced: false });
    store.dispatch({ type: 'SET_PEERS', allPeers });
    // wait 30 seconds before initiating reverse connection
    setTimeout(async () => {
      let allPeers = store.getState().allPeers;
      let peer = find(allPeers, ({ ip }) => ip === member.id);
      if (!peer || !peer.connected) {
        await connectWithPeer(member.id, 8334);
      }
    }, 30 * 1000);
  });

  // for each node, establish TCP/IP connection and send VERSION message
  const tcpServer = net.createServer();
  tcpServer.on('connection', handleConnection);
  tcpServer.listen(8334, '0.0.0.0', () => {
    console.log('> TCP/IP server listening on: ', tcpServer.address());
  });
});

async function handleConnection(conn) {
  console.log('> New client connection from : '.blue, conn.remoteAddress, conn.remotePort);
  conn.setEncoding('utf8');
  const ctx = { client: conn, isServer: true, ip: conn.remoteAddress };
  store.dispatch({ type: 'CONNECT_PEER', client: conn, ip: conn.remoteAddress, port: conn.remotePort });
  conn.on('data', handleData.bind(ctx));
  conn.on('error', (err) => console.warn(err));
}

async function connectWithPeer(ip, port) {
  const client = new net.Socket();

  client.connect(port, ip, () => {
    console.log('> Connected to peer: '.blue, ip, port);
    store.dispatch({ type: 'CONNECT_PEER', ip, client, port });

    let lastBlock = store.getState().lastBlock;
    client.write(['VERSION', '1', lastBlock.hash].join(DL));
  });
  const ctx = { client, isServer: false, ip };
  client.setEncoding('utf8');
  client.on('data', handleData.bind(ctx));
  client.on('error', (err) => console.warn(err));
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
