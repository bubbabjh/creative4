var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/game.js', function (req,res,next)
{
    res.sendFile('game.js', {root:'public/javascripts'});
})

module.exports = router;
