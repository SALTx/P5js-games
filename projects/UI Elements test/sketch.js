

// Array containing the buttons
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

  // Testing buttons and what happens if two are on top of each other
  buttonArray.push(
    new Button(100, 100, 100, 50, "Miggo"),
    new Button(150, 125, 100, 50, "burgo"),
  )

}

//! Draw
function draw() {
  background(220); // reset the background every frame

  myFella.render();
}


//! Mouse clicked 
function mouseClicked() {

}
