
const router = require('express').Router();
var articles = require('../controller/controller');

router.route('/top')
    .get(articles.topStories);
    // .post(articles.createArticle);

router.route('/opinion')
    .get(articles.opinions);

router.route('/sports')
    .get(articles.sports);

router.route('/')
    .get(articles.all)
    .post(articles.createNew);


module.exports = router;
