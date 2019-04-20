// articles.js

const MAX_REQUEST = 1000;  // amount of articles in query
const DEFAULT_REQUEST = 250; // amount of articles in query
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
    q = "SELECT * FROM ARTICLES ORDER BY DATE DESC LIMIT 0, ?";
    pool.query(q, [DEFAULT_REQUEST], (err, res) => {
        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(err, null);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getNews = (result) => {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='news' ORDER BY DATE DESC LIMIT 0, ?";
    pool.query(q, [DEFAULT_REQUEST], (err, res) => {
        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(err, null);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getSports = (result) => {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='sports' ORDER BY DATE DESC LIMIT 0, ?";
    pool.query(q, [DEFAULT_REQUEST], (err, res) => {
        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(err, null);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getArts = (result) => {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='arts' ORDER BY DATE DESC LIMIT 0, ?";
    pool.query(q, [DEFAULT_REQUEST], (err, res) => {
        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(err, null);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getOpinion = (result) => {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='opinion' ORDER BY DATE DESC LIMIT 0, ?";
    pool.query(q, [DEFAULT_REQUEST], (err, res) => {
        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(err, null);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getChalk = (result) => {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='chalk' ORDER BY DATE DESC LIMIT 0, ?";
    pool.query(q, [DEFAULT_REQUEST], (err, res) => {
        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(err, null);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getMultimedia = (result) => {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='multimedia' ORDER BY DATE DESC LIMIT 0, ?";
    pool.query(q, [DEFAULT_REQUEST],(err, res) => {
        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(err, null);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getSpecials = (result) => {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='specials' ORDER BY DATE DESC LIMIT 0, ?";
    pool.query(q, [DEFAULT_REQUEST], (err, res) => {
        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(err, null);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.getEverything = (result) => {
    q = "SELECT * FROM ARTICLES ORDER BY DATE DESC LIMIT 0, ?";
    pool.query(q, [MAX_REQUEST], (err, res) => {
        if (err) {
            console.log("error: ", err);
            logger.info('error getting query: ' + err.stack);
            result(err, null);
            throw err;
        }
        else {
            result(null, res);
        }
    });
};

Article.searchArticlesByKeyword = (result, searchString) => {
    let keywords = searchString.toString().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, " ").split(" ");
    keywords.filter(word => word.length > 2);
    let n_keywords = keywords.length;

    if (n_keywords == 1) {
        q = "SELECT * FROM ARTICLES WHERE ARTICLES.HEADLINE LIKE LOWER( ? ) ORDER BY DATE DESC LIMIT 0, ?";
        pool.query(q, ['%' + keywords[0] + '%', MAX_REQUEST], (err, res) => {
            if (err) {
                console.log("error: ", err);
                logger.info('error getting query: ' + err.stack);
                result(err, null);
                throw err;
            }
            else {
                result(null, res);
            }
        });
    }
    else if (n_keywords == 2) {
        q = "SELECT * FROM ARTICLES WHERE ARTICLES.HEADLINE LIKE LOWER( ? ) AND ARTICLES.HEADLINE LIKE LOWER( ? ) ORDER BY DATE DESC LIMIT 0, ?";
        pool.query(q, ['%' + keywords[0] + '%', '%' + keywords[1] + '%', MAX_REQUEST], (err, res) => {
            if (err) {
                console.log("error: ", err);
                logger.info('error getting query: ' + err.stack);
                result(err, null);
                throw err;
            }
            else {
                result(null, res);
            }
        });
    }
    else if (n_keywords > 2) {
        q = "SELECT * FROM ARTICLES WHERE ARTICLES.HEADLINE LIKE LOWER( ? ) AND ARTICLES.HEADLINE LIKE LOWER( ? ) AND ARTICLES.HEADLINE LIKE LOWER( ? ) ORDER BY DATE DESC LIMIT 0, ?";
        pool.query(q, ['%' + keywords[0] + '%', '%' + keywords[1] + '%', '%' + keywords[2] + '%', MAX_REQUEST], (err, res) => {
            if (err) {
                console.log("error: ", err);
                logger.info('error getting query: ' + err.stack);
                result(err, null);
                throw err;
            }
            else {
                result(null, res);
            }
        });
    } 
};

module.exports = Article;
