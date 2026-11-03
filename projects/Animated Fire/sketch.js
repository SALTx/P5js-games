function setup() {
  createCanvas(400, 400);
  background(220);

  // Initialize fire
  Fire.initializeArray();

  // Debug, see whats in the array
  console.log(Fire.fireArray);
}

function draw() {
  // Draw the fire
  Fire.drawFire();
}
