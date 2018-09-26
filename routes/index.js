var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

// router.use('/wiki/', wikiRouter);
// router.use('/wiki/', wikiRouter);
router.use('/', wikiRouter)

router.get('/:urlTitle', function (req, res, next) {
    res.json(req.body)
    // res.send('llego a la ruta dinámica con: ' + req.params.urlTitle);
});


router.get('/:urlTitle', function (req, res, next) {
    Page.findOne({ 
      where: { 
        urlTitle: req.params.urlTitle 
      } 
    })
    .then(function(foundPage){
      res.json(foundPage);
    })
    .catch(next);
});


module.exports = router;