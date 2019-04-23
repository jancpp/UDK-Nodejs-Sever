// controller.js

const Article = require('../db/articles');

exports.topStories = (req, res) => {
    Article.getTopStories( (err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('top stories: request failed');
        } else {
            console.log('top stories request');
            res.send(rows);
        }
    }) 
};

exports.news = (req, res) => {
    Article.getNews((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('news: request failed');
        } else {
            console.log('news request');
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


exports.arts = (req, res) => {
    Article.getArts((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('arts: request failed');
        } else {
            console.log('arts request');
            res.send(rows);
        }
    })
};

exports.opinion = (req, res) => {
    Article.getOpinion((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('opinion: request failed');
        } else {
            console.log('opinion request');
            res.send(rows);
        }
    })
};

exports.chalk = (req, res) => {
    Article.getChalk((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('chalk: request failed');
        } else {
            console.log('chalk request');
            res.send(rows);
        }
    })
};

exports.multimedia = (req, res) => {
    Article.getMultimedia((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('multimedia: request failed');
        } else {
            console.log('multimedia request');
            res.send(rows);
        }
    })
};

exports.specials = (req, res) => {
    Article.getSpecials((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('specials: request failed');
        } else {
            console.log('specials request');
            res.send(rows);
        }
    })
};

exports.onthehill = (req, res) => {
    Article.getSpecials((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('specials: request failed');
        } else {
            console.log('specials request');
            res.send(rows);
        }
    })
};

exports.all = (req, res) => {
    Article.getEverything((err, rows) => {
        if (err) {
            res.status(404).send(err);
            console.log('everything: request failed');
        } else {
            console.log('everything request');
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


