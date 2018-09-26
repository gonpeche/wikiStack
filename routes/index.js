var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
var routes = require('../routes'); 


// router.use('/', wikiRouter);

// router.get('/', function(res,res) {
//     res.render('index')
// })


//nuevo 
router.use('/', wikiRouter);
// router.use('/users', userRouter);


module.exports = router;