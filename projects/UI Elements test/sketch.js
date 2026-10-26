

// Array containing the buttons
let buttonArray = [] // empty array, initialized in the init function
let progressBarArray = []; // empty array, initialized in the init function 
let checkboxArray = [] // empty array, initialized inside the init function 

//! Test variables
let myFirstSlider = new Slider(50, 100, 150, 50);
let mySecondSlider = new Slider(150, 200, 150, 50);

//! Setup
function setup() {
  // Configure the canvas
  createCanvas(400, 400);
  background(220); // Gainsboro background color

  // configure text to be rendered in the center
  textAlign(CENTER, CENTER);

  //* initialize buttons
  buttonArray.push(new Button(100, 100, 100, 50, "Button 1"));
  buttonArray.push(new Button(100, 160, 100, 50, "Button 2"));

  //* initialize progress bar
  progressBarArray.push(new ProgressBar(100, 100, 100, 50));

  //* initialize checkboxes
  checkboxArray.push(new Checkbox(100, 100, false));
  checkboxArray.push(new Checkbox(200, 100, false));
  checkboxArray.push(new Checkbox(200, 200, false));
  checkboxArray.push(new Checkbox(100, 200, false));

}

//! Draw
function draw() {
  background(220); // reset the backgroudn every frame

  // Draw the sliders
  myFirstSlider.render();
  mySecondSlider.render();  
}


//! Mouse clicked
function mouseClicked() {

}
