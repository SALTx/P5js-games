//hackables
var spotlightSize = 250; //changes the size of the spotlight
var noClip = false;     //allows you to move outside the canvas
var invincible = false; //allows you to live forever
var score = 0;          //score(doesnt work for now)

//setup
textAlign(CENTER, CENTER);
cursor('none');
frameRate(60);

//vars
var timer = 0;
var sz = 0;

var keys = [];
keyPressed = function() {keys[keyCode] = true;};
keyReleased = function() {keys[keyCode] = false;};

var scene = "main"; //main how game end

var drawLightning = function(x, y, col, rot, size) {
    fill(col);
    pushMatrix();
    scale(size);
    translate(x, y);
    rotate(rot);
    scale(3);
    stroke(220/255*red(col), 229/255*red(col), 0);
    strokeWeight(3);
    beginShape();
    vertex(0, -50);
    vertex(20, -50);
    vertex(0, 0);
    vertex(20, 0);
    vertex(-10, 50);
    vertex(0, 10);
    vertex(-15, 10);
    endShape(CLOSE);
    popMatrix();
    noStroke();
};  
var drawCursor = function() {
    fill(255, 255, 0);
    drawLightning(mouseX*10, mouseY*10, color(255, 255, 0), 0, 0.1);
    ellipse(mouseX, mouseY, 1, 1);
};
var drawSpotlight = function(x, y, z) {
    fill(120, 120, 0);
    ellipse(x, y, z, z);
};
var button = function(x, y, txt, destination) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.destination = destination;
    this.draw = function() {
        textSize(25);
        this.hover = (dist(mouseX, mouseY, this.x, this.y) < 50);
        fill(0);
        if(this.hover) {
            fill(255);
        }
        text(this.txt, this.x, this.y);
    };
    this.onClick = function() {
        this.hover = (dist(mouseX, mouseY, this.x, this.y) < 50);
        if(this.hover) {
            scene = this.destination;
        }
    };
};
var buttons = [];
buttons.push(new button(100, 300, "Play", "game"));
buttons.push(new button(300, 300, "How", "how"));
buttons.push(new button(200, 300, "Try again", "game"));
buttons.push(new button(200, 300, "Play", "game"));


var player = {
    x: 200,
    y: 200,
    speed: 5,
    score: score,
    dead: false,
};
var enemies = [];
var enemy = function() {
    this.color = color(0);
    this.speed = 1 + player.score*0.1;
    this.dir = floor(random(4));
    if(this.dir === 0) {
        this.x = 0;
        this.y = random(400);
    }
    if(this.dir === 1) {
        this.x = random(400);
        this.y = 0;
    }
    if(this.dir === 2) {
        this.x = 400;
        this.y = random(400);
    }
    if(this.dir === 3) {
        this.x = random(400);
        this.y = 400;
        
    }
    this.draw = function() {
        fill(this.color);
        ellipse(this.x, this.y, 20, 20);
    };
    this.move = function() {
        if(this.dir === 0) {
            this.x += this.speed;
        }
        if(this.dir === 1) {
            this.y += this.speed;
        }
        if(this.dir === 2) {
            this.x -= this.speed;
        }
        if(this.dir === 3) {
            this.y -= this.speed;
        }
    };
    this.collide = function() {
        if(dist(this.x, this.y, player.x, player.y) < 20 && !invincible) {
            this.color = color(255, 0, 0);
            player.dead = true;
            sz += 1;
            if(sz > 100) {
                scene = "end";
            }
        }
    };
};
var spawnEnemies = function() {
    if(timer % 250 - player.score*5 === 0) {
        for(var i = 0; i < floor(player.score/4) + 1; i++) {
            enemies.push(new enemy());
        }
    }
    timer++;
};
var drawEnemies = function() {
    for(var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
};
var moveEnemies = function() {
    for(var i = 0; i < enemies.length; i++) {
        enemies[i].move();
        if(enemies[i].x > 400 || enemies[i].x < 0 || enemies[i].y > 400 || enemies[i].y < 0) {
            enemies.shift();
            player.score += 1;
        }
    }
};
var enemiesCollide = function() {
    for(var i = 0; i < enemies.length; i++) {
        enemies[i].collide();
    }
};

var drawPlayer = function() {
    fill(255, 255, 0);
    ellipse(player.x, player.y, 20, 20);
};
var movement = function() {
    if((keys[UP] || keys[87]) && (player.y > 10 || noClip)) {player.y -= player.speed;}
    if((keys[DOWN] || keys[83]) && (player.y < 390 || noClip)) {player.y += player.speed;}
    if((keys[LEFT] || keys[65]) && (player.x > 10 || noClip)) {player.x -= player.speed;}
    if((keys[RIGHT] || keys[68]) && (player.x < 390 || noClip)) {player.x += player.speed;}
};

var drawMain = function() {
    background(0);
    fill(255);
    textSize(50);
    drawSpotlight(mouseX, mouseY, spotlightSize);
    fill(255);
    drawLightning(200*2, 250*2, color(255, 255, 0), 0, 0.5);
    fill(255);
    text("Spotlight", 200, 100);
    textSize(10);
    text("find the play button", 200, 390);
    buttons[0].draw();
    buttons[1].draw();
};
var drawHow = function() {
    background(0);
    drawSpotlight(mouseX, mouseY, spotlightSize);
    textSize(50);
    fill(255);
    text("How", 200, 100);
    textSize(20);
    text("Use arrow keys/WASD to move", 200, 150);
    text("Avoid the enemies hidden in the dark\n using the spotlight by moving\nyour mouse around", 200, 200);
    fill(0);
    text("You found the first hidden message", 200, 250);
    buttons[3].draw();
};
var drawGame = function() {
    background(0);
    drawSpotlight(mouseX, mouseY, spotlightSize-player.score*0.25 + sz);
    drawPlayer();
    if(!player.dead) {
        movement();
        spawnEnemies();
        moveEnemies();
    }
    drawEnemies();
    enemiesCollide();
    fill(255);
    textSize(15);
    text("score: " + player.score, 200, 380);
};
var drawEnd = function() {
    background(0);
    drawSpotlight(mouseX, mouseY, spotlightSize);
    fill(255);
    textSize(50);
    text("Game over", 200, 120);
    textSize(20);
    text("Final score: " + player.score, 200, 160);
    buttons[2].draw();
};

var reset = function() {
    player.x = 200; player.y = 200; player.dead = false; sz = 0; scene = "game"; enemies = []; player.score = 0;
};

mouseClicked = function() {
    if(scene === "main") {
        buttons[0].onClick();
        buttons[1].onClick();
    }
    if(scene === "how") {
        buttons[3].onClick();
    }
    if(scene === "game") {
        
    }
    if(scene === "end") {
        reset();
        buttons[2].onClick();
    }
};

draw = function() {
    if(scene === "main") {
        drawMain();
    }
    if(scene === "how") {
        drawHow();
    }
    if(scene === "game") {
        drawGame();
    }
    if(scene === "end") {
        drawEnd();
    }
    drawCursor();
};



