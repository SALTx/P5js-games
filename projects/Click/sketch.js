// start settings game end
var screen = 'start'

var xPos, yPos;
var score = 0;

var testButton = new Button(200, 200, 100, 50, "Start", function() {
  screen = 'game';
  console.log("Button clicked");
});

var buttons = [];

function setup() {
  createCanvas(400, 400);
  xPos = random(width - 50);
  yPos = random(height - 50);
  noStroke();
  textAlign(CENTER, CENTER);
}

function draw() {
  if(screen == 'start') startScreen();
  if(screen == 'game') gameScreen();
}

function mouseClicked() {
  if(screen == 'start') {
    testButton.onClick();
  }
  if(sreen = 'game') {
    if(mouseX > xPos && mouseX < xPos + 50 && mouseY > yPos && mouseY < yPos + 50) {
      xPos = random(width - 50);
      yPos = random(height - 50);
      score++;
    }
  }
}

function startScreen() {
  background(0, 0, 255);
  fill(0);
  testButton.draw();
}

function gameScreen() {
  background(220);
  fill(255, 0, 0);
  rect(xPos, yPos, 50);
  fill(0);
  text("Score: " + score, 10, 10);
}