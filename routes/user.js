var express = require('express')
var router = express.Router() // 
var models = require('../models');
var User = models.User;
var Page = models.Page; 

router.get('/', function(req, res, next) {
    User.findAll({}).then(function(users){
      res.render('users', { users: users });
    }).catch(next);
});

router.get('/:userId', function(req, res, next) {
    var userPromise = User.findById(req.params.userId);
    var pagesPromise = Page.findAll({
        where: {
        authorId: req.params.userId
        }
    });
    Promise.all([
        userPromise, 
        pagesPromise
    ])
    .then(function(values) {
        var user = values[0];
        var page = values[1];

        res.render('user', { users: user, pages: page });
    })
    .catch(next);
});


module.exports = router;