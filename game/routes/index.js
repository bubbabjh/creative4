var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */

router.get('/game.js', function (req,res,next)
{
    res.sendFile('game.js', {root:'public/javascripts'});
})

router.get('/stickman.jpg', function (req,res,next)
{
    res.sendFile('stickman.jpg', {root:'public/images'});
})

router.get('/stickman.1.jpg', function (req,res,next)
{
    res.sendFile('stickman.1.jpg', {root:'public/images'});
})

router.get('/stickman.2.jpg', function (req,res,next)
{
    res.sendFile('stickman.2.jpg', {root:'public/images'});
})

router.get('/', function (req,res,next)
{
    res.sendFile('index.html', {root:'public'});
})

module.exports = router;
