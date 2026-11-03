function setup() {
  // Set up canvas
  createCanvas(400, 400);
  background(0);

  // Style settings
  noStroke();

  // Initialize fire
  Fire.initializeArray();

}

function draw() {
  // reset the background
  background(0);

  // Draw the fire
  Fire.drawFire();

  // Update the fire
  Fire.updateFire();
}
