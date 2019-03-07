
const Database = require('../db/Database');
const db = new Database();


function Article(id = 0, url = '', headline = '', author = '', date = 2000-01-01, main_image = '', body = '', category = '') {
    this.id = id; 
    this.url = url; 
    this.headline = headline; 
    this.author = author; 
    this.date = date; 
    this.main_image = main_image; 
    this.body = body; 
    this.category = category; 
}


Article.getTopStories = function (result) {
    q = "SELECT * FROM ARTICLES LIMIT 0, 40";
    db.query(q, function (err, res) {

        if (err) {
            db.close().then(() => { throw err; })
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Article.getOpinions = function (result) {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='Opinion' LIMIT 0, 40";
    db.query(q, function (err, res) {

        if (err) {
            db.close().then(() => { throw err; }).catch(err => {
                // handle the error
                console.error('error getting query: ' + err.stack);
            });  
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Article.getSports = function (result) {
    q = "SELECT * FROM ARTICLES WHERE CATEGORY='Sports' LIMIT 0, 40";
    db.query(q, function (err, res) {

        if (err) {
            db.close().then(() => { throw err; })
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Article.getAllArticles = function (result) {
    q = "SELECT * FROM ARTICLES LIMIT 0, 1000";
    db.query(q, function (err, res) {

        if (err) {
            db.close().then(() => { throw err; })
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Article.createArticle = function (newArticle, result) {
    q = "INSERT INTO ARTICLES SET ?";
    db.query(q, newArticle, function (err, res) {

        if (err) {
            db.close().then(() => { throw err; })
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log(res.id);
            result(null, res.id);
        }
    });
};
 
// Article.prototype.getSports = function (count = 25) {
//     return `SELECT * FROM ARTICLES WHERE CATEGORY="Sports" LIMIT 0, ${count - 1}`;
// }

// Article.prototype.getOpinions = function (count = 25) {
//     return `SELECT * FROM ARTICLES WHERE CATEGORY="Opinions" LIMIT 0, ${count - 1}`;
// }

// Article.prototype.getEverything = function() {
//     return`SELECT * FROM ARTICLES`; 
// }

// Article.prototype.getStoryById = function (id) {
//     return `DELETE FROM ARTICLES WHERE ID = ${id}`;
// }

// Article.prototype.getStoryByKeyword = function (word) {
//     return `DELETE FROM ARTICLES WHERE HEADLINE = ${word}`;
// }

module.exports = Article; 