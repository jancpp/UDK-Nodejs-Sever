const router = require('express').Router();

router.get('/sports', (req, res) => {
    let obj = {
        message: 'This is a sports ROUTE',
    };

    res.status(200).send(obj);
});

module.exports = router;


// an atempt to post data on server
// router.post('/addArticle', (req, res) => {
//     const { id, url,
//          headline, author, date, main_image, body } = req.body;

//     let newArticle = new Article({
//         id,
//         url,
//         headline,
//         author,
//         date,
//         main_image,
//         body
//     });

//     newArticle
//         .save()
//         .then(article => {
//             if (!article) {
//                 return res.status(400).send();
//                 console.log('article not saved');
//             }
//             return res.status(201).send(article);
//         })
//         .catch(err => {
//             if (err) {
//                 console.log(err);
//                 return res.status(400).send({ error: err });
//             }
//             console.log('error');
//             return res.status(400).send();
//         });
// });


module.exports = router;
