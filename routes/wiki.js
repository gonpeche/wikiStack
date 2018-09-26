var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.get('/add', function(req, res, next) {
    res.render('addpage')
});

router.get('/', function(req, res, next) {
    
    Page.findAll().then( function(resultado) {
        
        console.log('1',resultado);
        console.log('2',resultado.body);
    })
     // res.render('index', {page: Page.findAll()})
    // res.redirect('/');
});


router.post('/', function(req, res, next) {
    // res.json(req.body)
  // agregá definiciones para  `title` y `content`
  var page = Page.build({
    title: req.body.pageTitle,
    content: req.body.pageContent
  });
  // Asegurate que solo redirigimos **luego** que nuestro save esta completo!
  // nota:  `.save` devuelve una promesa o puede tomar un callback.
//   var promiseSave = page.save()
//   promiseSave.then(() => {
//     //   res.json(promiseSave)
//     // console.log('json:',res.json(promiseSave))
//     res.json(promiseSave.)
//     //   res.redirect(promiseSave.fulfillmentValue.route);
//     })

    page.save()
  .then(savedPage => {
    res.redirect(savedPage.route); // route virtual FTW
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
        // console.log(foundPage.dataValues.title)
        // console.log(foundPage)
        res.render('wikipage', { 
            pageTitle: foundPage.dataValues.title, 
            pageContent: foundPage.dataValues.content,
            authorName: foundPage.authorName 
        });
    })
    .catch(next);
});


module.exports = router;
