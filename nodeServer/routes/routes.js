
const router = require('express').Router();
const articles = require('../controller/controller');
const logger = require('../logs/log');

router.route('/top')
    .get(articles.topStories);

router.route('/news')
    .get(articles.news);

router.route('/sports')
    .get(articles.sports);

router.route('/arts')
    .get(articles.arts);

router.route('/opinion')
    .get(articles.opinion);

router.route('/chalk')
    .get(articles.chalk);

router.route('/multimedia')
    .get(articles.multimedia);

router.route('/specials')
    .get(articles.specials);

router.route('/onthehill')
    .get(articles.specials);

router.route('/')
    .get(articles.all);

router.route('/search?')
    .get(articles.searchByKey);

module.exports = router;
