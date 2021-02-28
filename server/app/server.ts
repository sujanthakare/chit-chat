import express from 'express';
import axios from 'axios';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

import {
  users,
  messages,
  conversations,
  findConversation,
  creatConversation,
  createUser,
  findUser,
  createMessage,
} from './db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on('connection', (socket: Socket) => {
  console.log('connected');
  const { userId, senderId } = socket.handshake.query;
  const conversation = findConversation(userId as string, senderId as string);
  if (conversation) {
    io.emit('conversationInit', conversation.id);
    io.emit('message', messages[conversation.id]);
  } else {
    const newConversation = creatConversation(userId as string, senderId as string);
    messages[newConversation.id] = [];
    io.emit('conversationInit', newConversation.id);
    io.emit('message', []);
  }
  // ...
});

app.post('/enter', (req, res) => {
  const { name } = req.body;

  const existingUser = findUser(name);

  if (existingUser) {
    return res.send(existingUser);
  }

  const newUser = createUser(name);
  return res.send(newUser);
});

app.get('/users', (req, res) => {
  const { userid } = req.headers;

  const usersWithoutCurrentUser = users.filter((user) => {
    if (user.id === userid) {
      return false;
    }

    return true;
  });

  return res.send(usersWithoutCurrentUser);
});

/**
 *
 */

app.post('/sendMessage', (req, res) => {
  const { conversationId, fromUserId, toUserId, messageText } = req.body;
  createMessage(conversationId, messageText, fromUserId, toUserId);

  io.emit('message', messages[conversationId]);

  return res.send({ success: true });
});

/**
 *
 *
 */

app.post('/chromeVersion', async function (req, res) {
  const { os } = req.body;
  const response = await axios.get('https://omahaproxy.appspot.com/all.json');

  let chromeLatestVersion = '0';
  response.data.forEach((item) => {
    if (item.os === os) {
      const stable = item.versions.find((v) => {
        if (v.channel === 'stable') {
          return true;
        }
        return false;
      });

      chromeLatestVersion = stable.current_version;
    }
  });

  return res.send({
    latest: chromeLatestVersion,
  });
});

httpServer.listen(PORT, () => {
  console.info(`Listening to port ${PORT}`);
});
