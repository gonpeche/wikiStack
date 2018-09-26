var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.get('/add', function(req, res, next) {
    res.render('addpage')
});

router.get('/', function(req, res, next) {
    res.redirect('/');
  });


router.post('/', function(req, res, next) {
  // agregá definiciones para  `title` y `content`
  var page = Page.build({
    title: req.body.pageTitle,
    content: req.body.pageContent
  });
  // Asegurate que solo redirigimos **luego** que nuestro save esta completo!
  // nota:  `.save` devuelve una promesa o puede tomar un callback.
  var promiseSave = page.save()

  promiseSave.then(() => {
    //   res.json(promiseSave)
    // console.log(res.json(promiseSave))
      res.redirect('/');
    })
});


module.exports = router;