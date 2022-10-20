var xPos, yPos;
var score = 0;

function setup() {
  createCanvas(400, 400);
  xPos = random(width - 50);
  yPos = random(height - 50);
  noStroke();
}

function draw() {
  background(220);
  fill(255, 0, 0);
  rect(xPos, yPos, 50);
  fill(0);
  text("Score: " + score, 10, 10);
}

function mouseClicked() {
  // Check if the mouse is inside the square
  if (
    mouseX > xPos &&
    mouseX < xPos + 50 &&
    mouseY > yPos &&
    mouseY < yPos + 50
  ) {
    score++;
    xPos = random(width - 50);
    yPos = random(height - 50);
  }
}
