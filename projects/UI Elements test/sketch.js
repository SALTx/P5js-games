

// Array containing the buttons
let buttonArray = [] // empty array, initialized in the init function
let progressBarArray = []; // empty array, initialized in the init function 
let checkboxArray = [] // empty array, initialized inside the init function 

//! Test variables
let firstButton = new Button(100, 100, 100, 50, "Test 1");
let secondButton = new Button(300, 160, 100, 50, "Test 2");

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

  rectMode(CORNER);
  firstButton.render();

  rectMode(CENTER);
  secondButton.render();
}


//! Mouse clicked
function mouseClicked() {
  // Calls the static function inside the button class to handle when the buttons in an array are clicked
  // Button.handleButtonClicks(buttonArray);

  firstButton.onClick();
  secondButton.onClick();
}
