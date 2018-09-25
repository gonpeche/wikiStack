var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next) {
    res.render('addpage')
});

router.get('/', function(req, res, next) {
    res.redirect('/');
  });

router.post('/', function(req, res, next) {
    res.send('funcionó POST /wiki/');
});

router.get('/add', function(req, res, next) {
    res.send('funcionó POST /wiki/add');
});

module.exports = router;