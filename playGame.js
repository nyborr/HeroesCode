var myGamePiece;
var objectCollected = false;
var enemyKilled = false;
character = sessionStorage.getItem("char");
character = character.replace("%20", " ");
document.getElementById("charHeader").innerHTML = "Welcome " + character;

function startGame() {
    console.log(sessionStorage.getItem("imag"));
    myGameArea.start();
    console.log(character);
    if (character == "Thor") {
        myGamePiece = new component(30, 30, "blue", 30, 120);
        myObstacle = new component(10, 400, "black", 530, 0); 
        objectToGet = new component(30, 30, "red", 100, 500);
        myEnemy = new component(30, 30, "yellow", 600, 10);

    } else if (character == "Hulk") {
        myGamePiece = new component(30, 30, "green", 30, 120);
        myObstacle = new component(50, 400, "black", 200, 0);
        objectToGet = new component(30, 30, "red", 100, 500);
        myEnemy = new component(30, 30, "yellow", 600, 10);

    } else if (character == "Iron Man") {
        myGamePiece = new component(30, 30, "blue", 30, 120);
        myObstacle = new component(400, 10, "black", 0, 230);
        objectToGet = new component(30, 30, "red", 600, 400);
        myEnemy = new component(30, 30, "yellow", 600, 10);

    } else if (character == "Storm") {
        myGamePiece = new component(30, 30, "gray", 30, 120);
        myObstacle = new component(10, 400, "black", 530, 0);
        objectToGet = new component(30, 30, "red", 100, 500);
        myEnemy = new component(30, 30, "yellow", 600, 10);

    } else if (character == "Captain America") {
        myGamePiece = new component(30, 30, "blue", 30, 120);
        myObstacle = new component(10, 400, "black", 530, 0);
        objectToGet = new component(30, 30, "red", 100, 500);
        myEnemy = new component(30, 30, "yellow", 600, 10);
    }


}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 680;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.replaceChild(this.canvas, document.body.childNodes[4]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function component(width, height, color, x, y) {

    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

function updateGameArea() {
    myGameArea.clear();

    if(myGamePiece.x < 680 - 30) {
        myGamePiece.speedX = -myGamePiece.speedX;
        myGamePiece.speedY = -myGamePiece.speedY;
    }
    if(myGamePiece.y < 540 - 30) {
        myGamePiece.speedX = -myGamePiece.speedX;
        myGamePiece.speedY = -myGamePiece.speedY;
    }
    if(myGamePiece.x < 0 + 30) {
        myGamePiece.speedX = -myGamePiece.speedX;
        myGamePiece.speedY = -myGamePiece.speedY;
    }
    if(myGamePiece.y < 0 + 30) {
        myGamePiece.speedX = -myGamePiece.speedX;
        myGamePiece.speedY = -myGamePiece.speedY;   
    }

    if (objectCollected == false) {
        objectToGet.update();
    }
    if (enemyKilled == false) {
        myEnemy.update();
    }
    if (enemyKilled && objectCollected) {
        winningScreen();
    }
    checkForCollision();
    myGamePiece.newPos();    
    myGamePiece.update();
    myObstacle.update();
}

function moveup() {
    myGamePiece.speedY -= 10;
}

function movedown() {
    myGamePiece.speedY += 10; 
}

function moveleft() {
    myGamePiece.speedX -= 10; 
}

function moveright() {
    myGamePiece.speedX += 10; 
}

function attackEnemy() {
    if (enemyKilled == false) {
        console.log("test");
        if (collision(myGamePiece, myEnemy)) {
            delete enemyKilled;
            enemyKilled = true;
        }
    }
}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
}


function checkForCollision() {
    if (objectCollected == false) {
        if (collision(myGamePiece, objectToGet)) {
            delete objectToGet;
            objectCollected = true;
        } 
    }

    if (collision(myGamePiece, myObstacle)) {
        losingScreen();
    }

}

function collision(object1, object2) {
    return object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.y + object1.height > object2.y;
}

function winningScreen() {
    window.location = "winner.html";
}

function losingScreen() {
    window.location = "losing.html";
}


function startAgain() {
    window.location = "charSelect.html";
}