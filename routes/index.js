var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
var routes = require('../routes'); 

// router.get('/wiki', wikiRouter)
// router.get('/users', userRouter)


router.get('/', function(res,res) { res.render('index')})
router.use('/wiki', wikiRouter)
router.use('/users', userRouter)

// router.use('/', wikiRouter);


module.exports = router;