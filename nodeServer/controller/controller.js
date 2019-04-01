var Article = require('../db/articles');
const logger = require('../logs/log');

exports.topStories = (req, res) => {
    Article.getTopStories( (err, rows) => {
        // console.log('controller')
        if (err) {
            res.status(404).send(err);
            console.log('top stories: request failed');
        } else {
            // console.log('res', rows);
            console.log('top stories request');
            res.send(rows);
        }
    }) 
};

exports.opinions = (req, res) => {
    Article.getOpinions((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('opinions: request failed');
        } else {
            console.log('opinions request');
            res.send(rows);
        }
    })
};


exports.sports = (req, res) => {
    Article.getSports((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('sports: request failed');
        } else {
            console.log('sports request');
            res.send(rows);
        }
    })
};

exports.all = (req, res) => {
    Article.getAllArticles((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('all articles: request failed');
        } else {
            console.log('all articles request');
            res.send(rows);
        }
    })
};

// exports.searchByKey = (req, res) => {
//     Article.searchArticlesByKeyword((err, rows) => {
//         if (err) {
//             res.status(404).send(err);
//             console.log('search by keyword failed');
//         } else {
//             console.log('article by keyword request');
//             res.send(rows);
//         }
//     })
// };
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql.eecs.ku.edu',
    database: 'jpolzer',
    user: 'jpolzer',
    password: 'P@$$word123'});

exports.searchByKey = (req, res) => {
    let keyword = req.query.headline;
    // pool.query("SELECT * FROM ARTICLES WHERE ARTICLES.HEADLINE LIKE ? ", ['%' + keyword + '%'], (error, results, fields) => {

    pool.query("SELECT * FROM ARTICLES WHERE ARTICLES.HEADLINE='KU swim and dive head into uncharted territory in Big 12 Championships'", (error, results, fields) => { //, ['%' + keyword + '%'],  (error, results, fields) => {
        if (error) throw error;
        return res.send({ results });
    });
};

// exports.searchByKey =  (req, res, next) => {
//     var sql = "SELECT * FROM ARTICLES WHERE ARTICLES.HEADLINE LIKE ? ";
//     key = res.para

//     pool.query(
//         sql,
//         existingParams.map(field => req.query[field]),
//         function (error, results, fields) {
//             res.json({ "status": 200, "error": null, "response": results });
//         }
//     );
// };
   

