// start settings game end
var screen = 'start'

//! GLobals
var xPos, yPos;
var timer = 300; // 10 seconds based on framerate
var score = 0;
var highscore = 0;

//! Buttons
// Start buttons

// Game buttons
var startButton = new Button(150, 200, 100, 50, "Start", function() {
  screen = 'game';
  console.log("Game started");
});

// End buttons


function setup() {
  // create a 400 x 400px canvas
  createCanvas(400, 400);

  // setting initial position of the red square using the size of the canvas
  xPos = random(width - 50);
  yPos = random(height - 50);

  // decoration
  noStroke();
  textAlign(CENTER, CENTER);

  // set a consistent frame rate so that 30 frames are drawn every second
  frameRate(30);
}

function draw() {
  if(screen == 'start') startScreen();
  if(screen == 'game') gameScreen();
  if(screen == 'end') endScreen();
}

function mouseClicked() {
  if(screen == 'start') {
    startButton.onClick();
  }
  if(sreen = 'game') {
    // check if the mouse is inside the target square
    if(mouseX > xPos && mouseX < xPos + 50 && mouseY > yPos && mouseY < yPos + 50) {
      xPos = random(width - 50);
      yPos = random(height - 50);
      score++;
    }
  }
  if(screen == 'end') {
    score = 0;
    screen = 'start';
  }
}

function startScreen() {
  background(60, 60, 255);
  textFont("Impact", 52);
  text("Click", width / 2, height / 3);
  textFont("Arial", 16);
  text("Highscore: " + highscore, width / 2, height / 3 + 50);
  fill(0);
  startButton.draw();
}

function gameScreen() {
  // reduce the timer till it gets to 0
  if(--timer <= 0) {
    screen = 'end';
    timer = 300;
  }
  background(40, 40, 255);
  fill(255, 255, 40);
  rect(xPos, yPos, 50);
  fill(0);
  text("Score: " + score, 40, 20);
  text("Time: " + Math.floor(timer / 30), 40, 40);
}

function endScreen() {
  if(score > highscore) {
    highscore = score;
  }
  background(255, 0, 0);
  fill(0);
  text("Game Over", width / 2, height / 2);
  text("Score: " + score, width / 2, height / 2 + 20);
  text("Click to restart", width / 2, height / 2 + 40);
}