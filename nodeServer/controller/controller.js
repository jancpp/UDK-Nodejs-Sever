var Article = require('../model/articles');


exports.topStories = (req, res) => {
    Article.getTopStories( (err, rows) => {
        // console.log('controller')
        if (err) {
            res.send(err);
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
            res.send(err);
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
            res.send(err);
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
            res.send(err);
            console.log('all articles: request failed');
        } else {
            console.log('all articles request');
            res.send(rows);
        }
    })
};

exports.createNew = (req, res) => {
        var newArticle = new Article(req.body);

        //handles null error 
        if (!newArticle.article || !newArticle.status) {

            res.status(400).send({ error: true, message: 'Please provide article/status' });

        }
        else {

            Article.createArticle(newArticle, function (err, article) {

                if (err)
                    res.send(err);
                res.json(article);
            });
        }
    };