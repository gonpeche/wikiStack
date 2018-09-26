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
            console.log(x)
            res.render('index', {pages: x})
        }
    )

});

router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.pageTitle,
    content: req.body.pageContent
  });

    page.save()
  .then(savedPage => {
    // res.redirect(savedPage.route); // route virtual FTW
    res.redirect(savedPage.urlTitle); // route virtual FTW
  })
  .catch(next);

});

router.get('/:urlTitle', function (req, res, next) {
    Page.findOne({ 
      where: { 
        urlTitle: req.params.urlTitle 
      } 
    })
    .then(function(foundPage){

        res.render('wikipage', { 
            pageTitle: foundPage.dataValues.title, 
            pageContent: foundPage.dataValues.content,
            authorName: foundPage.authorName 
        });
    })
    .catch(next);
});


module.exports = router;
