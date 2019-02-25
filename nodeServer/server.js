// server.js
// start server: 'nodemon server' or 'node server'

const PORT = 3001; // to change port (export PORT=1234)
const ip = require('ip');
const IPADDRESS = ip.address();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Database = require('./db/Database');
const database = new Database(); 
const http = require('http');
// const api = express();
const api = require('./routes/routes');


class Server {
    constructor() {
        this.initDB();
        this.initBodyParser();
        this.initRoutes();
        this.start();
    }

    start(){
        
        var server = http.createServer(app);
        server.listen(PORT, IPADDRESS, () => {
            console.log(`server running at 'http://${IPADDRESS}:${PORT}/'`);
        });
    }

    initBodyParser() { 
        app.use(bodyParser.json()); 
    }
    initRoutes() { 
    }
    initDB() {
        this.getTopStories();
    }

    getTopStories() {
        database.query('SELECT * FROM Customers LIMIT 0, 24')
        // database.query('SELECT * FROM ARTICLES LIMIT 0, 24')
        .then(rows => {
            api.get('/', function (req, res) {
                console.log(api.mountpath); 
                res.send(rows);
            });

            app.use('/api', api); // mount the api
            console.log(rows);
            
            return database.close();
        }, err => {
            return database.close().then(() => { throw err; })
        })
        .catch(err => {
            // handle the error
            console.error('error getting query: ' + err.stack);
        });  
    }

    getSports() {
        database.query('SELECT Customers.login FROM Customers ORDER BY Customers.login')
        // database.query('SELECT ARTICLES.headline FROM Customers ORDER BY ARTICLES.date')
            .then(rows => {
                api.get('/', function (req, res) {
                    console.log(api.mountpath);
                    res.send(rows);
                });

                app.use('/api/sports', api); 
                console.log(rows);

                return database.close();
            }, err => {
                return database.close().then(() => { throw err; })
            })
            .catch(err => {
                // handle the error
                console.error('error getting query: ' + err.stack);
            });  
    }


    searchHeadline(keyword) {
        let keyword = req.params.keyword;
        database.query("SELECT * FROM Customers WHERE last_name LIKE ? ", ['%' + keyword + '%'])
            .then(rows => {
                api.get('/', function (req, res) {
                    console.log(api.mountpath);
                    res.send(rows);
                });

                app.use('/api/search/:keyword', api);
                console.log(rows);

                return database.close();
            }, err => {
                return database.close().then(() => { throw err; })
            })
            .catch(err => {
                // handle the error
                console.error('error getting query: ' + err.stack);
            });
    }

    searchByDate() {
        let date = req.params.date;
        database.query('SELECT * FROM Customers where date=?')
            // database.query('SELECT * FROM ARTICLES LIMIT 0, 24')
            .then(rows => {
                api.get('/', function (req, res) {
                    console.log(api.mountpath);
                    res.send(rows);
                });

                app.use('/api/search/:date', api); 
                console.log(rows);

                return database.close();
            }, err => {
                return database.close().then(() => { throw err; })
            })
            .catch(err => {
                // handle the error
                console.error('error getting query: ' + err.stack);
            });
    }
   

}

new Server();