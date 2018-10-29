var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */

router.get('/game.js', function (req,res,next)
{
    res.sendFile('game.js', {root:'public/javascripts'});
})

router.get('/', function (req,res,next)
{
    res.sendFile('index.html', {root:'public'});
})

module.exports = router;
