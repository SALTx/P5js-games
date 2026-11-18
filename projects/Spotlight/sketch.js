// hackables
let spotlightSize = 250; // changes the size of the spotlight
let noClip = false; // allows you to move outside the canvas
let invincible = false; // allows you to live forever

let timer = 0;
let sz = 0;
let keys = [];
let scene = "main"; // main how game end

let buttons = [];
let enemies = [];
let player = {
  x: 200,
  y: 200,
  speed: 5,
  score: 0,
  dead: false,
};

class Button {
  constructor(x, y, txt, destination) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.destination = destination;
    this.hover = false;
  }

  draw() {
    textSize(25);
    this.hover = dist(mouseX, mouseY, this.x, this.y) < 50;
    fill(this.hover ? 255 : 0);
    text(this.txt, this.x, this.y);
  }

  onClick() {
    this.hover = dist(mouseX, mouseY, this.x, this.y) < 50;
    if (this.hover) {
      scene = this.destination;
    }
  }
}

class Enemy {
  constructor() {
    this.color = color(0);
    this.speed = 1 + player.score * 0.1;
    this.dir = floor(random(4));
    if (this.dir === 0) {
      this.x = 0;
      this.y = random(400);
    } else if (this.dir === 1) {
      this.x = random(400);
      this.y = 0;
    } else if (this.dir === 2) {
      this.x = 400;
      this.y = random(400);
    } else {
      this.x = random(400);
      this.y = 400;
    }
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, 20, 20);
  }

  move() {
    if (this.dir === 0) this.x += this.speed;
    if (this.dir === 1) this.y += this.speed;
    if (this.dir === 2) this.x -= this.speed;
    if (this.dir === 3) this.y -= this.speed;
  }

  collide() {
    if (dist(this.x, this.y, player.x, player.y) < 20 && !invincible) {
      this.color = color(255, 0, 0);
      player.dead = true;
      sz += 1;
      if (sz > 100) {
        scene = "end";
      }
    }
  }
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  noStroke();
  noCursor();
  frameRate(60);

  buttons.push(new Button(100, 300, "Play", "game"));
  buttons.push(new Button(300, 300, "How", "how"));
  buttons.push(new Button(200, 300, "Try again", "game"));
  buttons.push(new Button(200, 300, "Play", "game"));
}

function keyPressed() {
  keys[keyCode] = true;
}

function keyReleased() {
  keys[keyCode] = false;
}

function drawLightning(x, y, col, rot, size) {
  fill(col);
  push();
  scale(size);
  translate(x, y);
  rotate(rot);
  scale(3);
  stroke((220 / 255) * red(col), (229 / 255) * red(col), 0);
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
  pop();
  noStroke();
}

function drawCursor() {
  fill(255, 255, 0);
  drawLightning(mouseX * 10, mouseY * 10, color(255, 255, 0), 0, 0.1);
  ellipse(mouseX, mouseY, 1, 1);
}

function drawSpotlight(x, y, z) {
  fill(120, 120, 0);
  ellipse(x, y, z, z);
}

function spawnEnemies() {
  if (timer % 250 - player.score * 5 === 0) {
    for (let i = 0; i < floor(player.score / 4) + 1; i++) {
      enemies.push(new Enemy());
    }
  }
  timer++;
}

function moveEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    if (
      enemies[i].x > 400 ||
      enemies[i].x < 0 ||
      enemies[i].y > 400 ||
      enemies[i].y < 0
    ) {
      enemies.shift();
      player.score += 1;
    }
  }
}

function drawPlayer() {
  fill(255, 255, 0);
  ellipse(player.x, player.y, 20, 20);
}

function movement() {
  if ((keys[UP_ARROW] || keys[87]) && (player.y > 10 || noClip)) player.y -= player.speed;
  if ((keys[DOWN_ARROW] || keys[83]) && (player.y < 390 || noClip)) player.y += player.speed;
  if ((keys[LEFT_ARROW] || keys[65]) && (player.x > 10 || noClip)) player.x -= player.speed;
  if ((keys[RIGHT_ARROW] || keys[68]) && (player.x < 390 || noClip)) player.x += player.speed;
}

function drawMain() {
  background(0);
  fill(255);
  textSize(50);
  drawSpotlight(mouseX, mouseY, spotlightSize);
  fill(255);
  drawLightning(200 * 2, 250 * 2, color(255, 255, 0), 0, 0.5);
  fill(255);
  text("Spotlight", 200, 100);
  textSize(10);
  text("find the play button", 200, 390);
  buttons[0].draw();
  buttons[1].draw();
}

function drawHow() {
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
}

function drawGame() {
  background(0);
  drawSpotlight(mouseX, mouseY, spotlightSize - player.score * 0.25 + sz);
  drawPlayer();
  if (!player.dead) {
    movement();
    spawnEnemies();
    moveEnemies();
  }
  for (const e of enemies) e.draw();
  for (const e of enemies) e.collide();
  fill(255);
  textSize(15);
  text("score: " + player.score, 200, 380);
}

function drawEnd() {
  background(0);
  drawSpotlight(mouseX, mouseY, spotlightSize);
  fill(255);
  textSize(50);
  text("Game over", 200, 120);
  textSize(20);
  text("Final score: " + player.score, 200, 160);
  buttons[2].draw();
}

function resetGame() {
  player.x = 200;
  player.y = 200;
  player.dead = false;
  player.score = 0;
  sz = 0;
  enemies = [];
  scene = "game";
}

function mouseClicked() {
  if (scene === "main") {
    buttons[0].onClick();
    buttons[1].onClick();
  } else if (scene === "how") {
    buttons[3].onClick();
  } else if (scene === "end") {
    resetGame();
    buttons[2].onClick();
  }
}

function draw() {
  if (scene === "main") drawMain();
  else if (scene === "how") drawHow();
  else if (scene === "game") drawGame();
  else if (scene === "end") drawEnd();
  drawCursor();
}
