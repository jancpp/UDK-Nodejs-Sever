
// articles.js

const logger = require('../logs/log');
const config = require('./config.js');
const mysql = require('mysql');
const pool = mysql.createPool(config);


function Article(id = 0, url = '', headline = '', author = '', date = 2000 - 01 - 01, main_image = '', main_image_byline = '', body = '', category = '') {
    this.id = id; 
    this.url = url; 
    this.headline = headline; 
    this.author = author; 
    this.date = date;
    this.main_image = main_image;
    this.main_image_byline = main_image_byline; 
    this.body = body; 
    this.category = category; 
}


Article.getTopStories = (result) => {
    q = "SELECT * FROM ARTICLES ORDER BY DATE DESC LIMIT 0, 40";
    pool.query(q, (err, res) => {

        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(null, err);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getOpinions = (result) => {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='Opinion' ORDER BY DATE DESC LIMIT 0, 40";
    pool.query(q, (err, res) => {

        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(null, err);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getSports = (result) => {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='Sports' ORDER BY DATE DESC LIMIT 0, 40";
    pool.query(q, (err, res) => {

        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(null, err);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getAllArticles = (result) => {
    q = "SELECT * FROM ARTICLES ORDER BY DATE DESC LIMIT 0, 1000";
    pool.query(q, (err, res) => {

        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(null, err);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.searchArticlesByKeyword = (result) => {
    q = "SELECT * FROM ARTICLES WHERE ARTICLES.HEADLINE LIKE ? ";
    let keyword = req.params.keyword;
    pool.query(q, ['%' + keyword + '%'], (err, res) => {

        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(null, err);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Article; 