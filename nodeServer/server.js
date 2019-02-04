// server.js
// start server: 'nodemon server' or 'node server'
// if already running: 'lsof -i tcp:3000' then 'Kill - 9 PID' then try again

const express = require('express');
const app = express();
const fs = require('fs');
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const hostname = '10.104.135.50'; // '104.248.235.9' or '127.0.0.1';
const PORT = process.env.PORT || 3000; // port 3000 unless specified (export PORT=1234)
var num = 0;

function getAtricle(num) {
  // num = 1;
  app.get('/api/' + num, (req, res) => {

    var articles = [];
    var article_by_num;
    fs.readFile(__dirname + "/data/url_list1.txt", function (err, buffer) {

      if (err) throw err;
      var data = buffer.toString();
      var urls = data.split(", ");

      article_by_num = {
        id: num,
        url: urls[num - 1]
      };
      res.send(JSON.stringify(article_by_num));
    });
  });
}

function getFirstTenAtricles() {
  app.get('/api/', (req, res) => {

    var articles = [];
    var article_by_num;
    fs.readFile(__dirname + "/data/url_list1.txt", function (err, buffer) {

      if (err) throw err;
      var data = buffer.toString();

      // for array of articles (10)
      var urls = data.split(", ");
      let count = urls.length;
      if (count > 10) {
        count = 10;
      };
      // console.log(urls.length);
      for (var i = 0; i < count; i++ ) {
        articles.push({
          id: i + 1,
          url: urls[i]
        });
      }
      // console.log(JSON.stringify(articles)); // Valid JSON
      article_arr = JSON.stringify(articles);
      res.send(article_arr);

    });
  });
}

// socket listener
io.on("connection", socket => {
  console.log("new client (react-native app) connected");
  socket.on("requestArticles", msg => {
    console.log(msg);
    if (msg == num) {
      num = '1';
      getAtricle(num);
      io.emit("requestArticles", "ready to fetch article 1");
    }
    io.emit("requestArticles", "node server received: " + msg);
  });
});

// listen for incomming connections
server.listen(PORT, () => console.log(`server running on port ${PORT}`));



