// server.js
// start server: 'nodemon server' or 'node server'
// if already running: 'lsof -i tcp:3000' then 'Kill - 9 PID' then try again

const express = require('express');
const app = express();
const fs = require('fs');
const ip = require('ip');
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3000; // port 3000 unless specified (export PORT=1234)
const IPADDRESS = ip.address();

// get first 10 articles from the url_list1.txt file and display on server
// check at http://localhost:3000/api
  app.get('/api/', (req, res) => {

    var articles = [];
    fs.readFile(__dirname + "/data/url_list1.txt", function (err, buffer) {

      if (err) throw err;
      var data = buffer.toString();

      // get for array of count articles (10)
      var urls = data.split(", ");
      let count = urls.length;
      if (count > 10) {
        count = 10;
      };
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

server.listen(PORT, () => console.log(` ... node.js server running at ${IPADDRESS}, port ${PORT}`));
