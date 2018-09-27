var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.get('/add', function(req, res, next) {
    res.render('addpage')
});

router.get('/', function(req, res, next) {
    Page.findAll()
    .then( x => {
            res.render('index', {pages: x})
        }
    )
});

router.post('/', function(req, res, next) {

    User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
    .then(function (values) {
        var user = values[0];
        var page = Page.build({
            title: req.body.pageTitle,
            content: req.body.pageContent
        });
        return page.save().then(function (page) {
            return page.setAuthor(user);
        });
    })
    .then(function (page) {
        res.redirect(page.urlTitle);
        // res.redirect(page.route);
    })
    .catch(next);

});

router.get('/:urlTitle', function (req, res, next) {
  

    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
        },
        include: [
            {model: User, as: 'author'}
        ]
    })
    .then(function (foundPage) {

        if (foundPage === null) {
            res.status(404).send();
        } else {
            res.render('wikipage', {
                page: foundPage,
                pageTitle: foundPage.dataValues.title, 
                pageContent: foundPage.dataValues.content,
                authorName: foundPage.authorName 
            });
        }
    })
    .catch(next);

});


module.exports = router;
