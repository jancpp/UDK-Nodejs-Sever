// server.js
// start server: 'nodemon server' or 'node server'

const PORT = process.env.port || 3001; // to change port (export PORT=1234)
const ip = require('ip');
const IPADDRESS = ip.address();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes/routes');


class Server {
    constructor() {
        this.initBodyParser();
        this.initRoutes();
        this.start();
    }

    start(){
        
        var server = http.createServer(app);
        app.set('port', process.env.PORT || PORT);
        server.listen(PORT, IPADDRESS, () => {
            console.log(`server running at 'http://${IPADDRESS}:${PORT}/'`);
        });
    }

    initBodyParser() { 
        app.use(bodyParser.json()); 
    }
    initRoutes() { 
        app.use('/api', routes);
    }
}

new Server();