

// Containers for the UI elements
let buttonArray = [] // empty array, initialized in the init function
let progressBarArray = []; // empty array, initialized in the init function 
let checkboxArray = [] // empty array, initialized inside the init function 

// Testing my fella
let myFella = new Fella(200, 200);

//! Setup
function setup() {
  // Configure the canvas
  createCanvas(400, 400);
  background(220); // Gainsboro background color

  // configure text to be rendered in the center
  textAlign(CENTER, CENTER);
}

//! Draw
function draw() {
  background(220); // reset the background every frame

  myFella.render();
}


//! Mouse clicked 
function mouseClicked() {

}
