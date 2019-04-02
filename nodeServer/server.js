// server.js
// to start server: 'forever start server' or 'nodemon server' or 'node server'

const PORT = process.env.port || 3001; // to change port (export PORT=1234)
const ip = require('ip');
const IPADDRESS = ip.address();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes/routes');
const logger = require('./logs/log');
const interval = 5 * 60 * 1000; // 5 minutes

class Server {
    constructor() {
        this.initBodyParser();
        this.initRoutes();
        this.start();
    }

    start() {
        
        var server = http.createServer(app);
        app.set('port', process.env.PORT || PORT);
        server.listen(PORT, IPADDRESS, () => {
            console.log(`server running at 'http://${IPADDRESS}:${PORT}/'`);
        });
        // update data on api every x minutes
        setInterval(
            () => {
                this.updateApi();
            },
            interval
        );
    }

    initBodyParser() { 
        app.use(bodyParser.json()); 
    }

    initRoutes() { 
        app.use('/api', routes);
    }

    updateApi() {
        app.use('/api', routes);
    }
}

new Server();
