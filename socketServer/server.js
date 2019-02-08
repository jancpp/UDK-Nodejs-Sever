// server.js
// start server: 'nodemon server' or 'node server'
// if already running: 'lsof -i tcp:4000' then 'Kill - 9 PID' then try again

const express = require('express');
const app = express();
const server = require("http").createServer(app);
const ip = require('ip');
const io = require("socket.io").listen(server);
const PORT = process.env.PORT || 4000; // port 4000 unless specified (export PORT=1234)
const IPADDRESS = ip.address();

// socket listener
io.on("connection", socket => {
  console.log("new client (react-native app) connected");
  socket.on("requestMessages", msg => {
    console.log(msg);
    io.emit("requestMessages", "node server received: " + msg);
  });
});

// listen for incomming connections
server.listen(PORT, () => console.log(`... socket.io server running at ${IPADDRESS}, port ${PORT}`));
