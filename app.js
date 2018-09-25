var morgan = require('morgan');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


app.get('/', function(res,res) {
    res.render('index')
})


app.listen(3000, () => 'Listening...')