var express = require('express')

var router = express.Router() // 

router.get('/', () => console.log('hola'))

module.exports = router;