
const router = require('express').Router();
const articles = require('../controller/controller');
const logger = require('../logs/log');

router.route('/top')
    .get(articles.topStories);
    // .post(articles.createArticle);

router.route('/opinion')
    .get(articles.opinions);

router.route('/sports')
    .get(articles.sports);

router.route('/')
    .get(articles.all);

router.route('/search?')
    .get(articles.searchByKey);

module.exports = router;
