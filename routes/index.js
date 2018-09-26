var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.get('/', function(res,res) { res.render('index')})
router.use('/wiki', wikiRouter)
router.use('/users', userRouter)

module.exports = router;