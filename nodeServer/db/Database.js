const config = require('./config.js');
const mysql = require('mysql');
const logger = require('../logs/log');

class Database {
    constructor() {
        this.connection = mysql.createConnection(config);
        console.log('mysql database was connected.');
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    // close database 
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = Database;
