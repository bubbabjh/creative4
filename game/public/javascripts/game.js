angular.module('myApp', [])
    .controller('gCont', mainControl);

function mainControl($scope, $https) {

}

window.onload = startGame;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Game
var onBottom;
var myGamePiece;
var myScore;
var myObstacle;

function startGame() {
    myGamePiece = new component(11, 21, "stickman.jpg", 10, 120, "image");
    //myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myObstacle = new component(10, 100, "green", 300, 170);
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.3;
    this.gravitySpeed = 0;
    this.update = function() {
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        }
        else {
            ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.gravitySpeed += this.gravity;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }

    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
            this.speedY = 0;
            onBottom = true;
        }
        else {
            onBottom = false;
        }

    }
}
var myObstacles = [];

function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(20 + Math.floor(Math.random() * 101))) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 200
        var oheight = Math.floor(Math.random() * 70) + 20;
        myObstacles.push(new component(Math.floor(Math.random() * 13) + 2, oheight, "green", x, myGameArea.canvas.height - oheight));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -2.5;
        myObstacles[i].update();
    }
    myGamePiece.newPos();
    myGamePiece.update();
}



kd.D.down(function() {
    console.log('The "D" key is being held down!');
    myGamePiece.width = 27;
    myGamePiece.height = 13;
    myGamePiece.image.src = "stickman.1.jpg";
    myGamePiece.speedY = .2;
    myGamePiece.speedX = 3;
    myGamePiece.gravitySpeed = 0;
});
kd.A.down(function() {
    console.log('The "A" key is being held down!');
    myGamePiece.width = 27;
    myGamePiece.height = 13;
    myGamePiece.image.src = "stickman.2.jpg";
    myGamePiece.speedY = .2;
    myGamePiece.speedX = -3;
    myGamePiece.gravitySpeed = 0;
});

kd.D.up(function() {
    myGamePiece.width = 11;
    myGamePiece.height = 21;
    myGamePiece.image.src = "stickman.jpg";
    myGamePiece.speedX = 0;
});

kd.A.up(function() {
    myGamePiece.width = 11;
    myGamePiece.height = 21;
    myGamePiece.image.src = "stickman.jpg";
    myGamePiece.speedX = 0;
});

kd.S.down(function() {
    console.log('The "S" key is being held down!');
    myGamePiece.speedY = 0;
    myGamePiece.speedX = 0;
    myGamePiece.gravitySpeed = 10;
});

kd.W.down(function() {
    if (onBottom) {
        myGamePiece.speedY -= 10;
    }
});

// This update loop is the heartbeat of Keydrown
kd.run(function() {
    kd.tick();
});
