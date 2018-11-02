var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */

var highScores = [];

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

router.get('/building.jpg', function (req,res,next)
{
    res.sendFile('building.jpg', {root:'public/images'});
})

router.get('/style.css', function (req,res,next)
{
    res.sendFile('style.css', {root:'public/stylesheets'});
})

router.get('/', function (req,res,next)
{
    res.sendFile('index.html', {root:'public'});
})

router.get('/highScores', function(req,res,next)
{
    res.send(highScores);
})


router.post('/highScores', function(req, res) {
    console.log("In Pokemon Post");
    console.log(req.body);
    highScores.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
}); 

module.exports = router;
