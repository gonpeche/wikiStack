var express = require('express');
var router = express.Router();

router.get('/add', function(req, res, next) {
    console.log('hola')
    res.render('addpage')
});

router.get('/', function(req, res, next) {
    res.send('funcionó GET /wiki/');
});

router.post('/', function(req, res, next) {
    res.send('funcionó POST /wiki/');
});

router.get('/add', function(req, res, next) {
    res.send('funcionó POST /wiki/add');
});

module.exports = router;