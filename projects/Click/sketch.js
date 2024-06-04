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
var testButton = new Button(200, 200, 100, 50, "Start", function() {
  screen = 'game';
  console.log("Button clicked");
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
  text(timer, 10, 350);
}

function mouseClicked() {
  if(screen == 'start') {
    testButton.onClick();
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
    screen = 'game';
  }
}

function startScreen() {
  background(0, 0, 255);
  fill(0);
  testButton.draw();
}

function gameScreen() {
  // reduce the timer till it gets to 0
  if(--timer <= 0) {
    screen = 'end';
    timer = 300;
  }
  background(220);
  fill(255, 0, 0);
  rect(xPos, yPos, 50);
  fill(0);
  text("Score: " + score, 10, 10);
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
