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

exports.searchByKey = (req, res) => {
    let keyword = req.query.headline;
    Article.searchArticlesByKeyword((err, rows) => {
        if (err) {
            res.status(404).send(err, keyword);
            console.log('search by keyword: request failed');
        } else {
            console.log('search by keyword request');
            res.send(rows);
        }
    }, keyword)
};


