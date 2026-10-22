

// Array containing the buttons
let buttonArray = [] // empty array, initialized in the init function
let progressBarArray = []; // empty array, initialized in the init function 
let checkboxArray = [] // empty array, initialized inside the init function 

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

  // Calls the static function inside the button class to render all the buttons in an array
  // Button.renderAllButtons(buttonArray);

  // Calls the static function inside progress bar class to render all the progress bars
  // ProgressBar.renderAllProgressBars(progressBarArray);

  // Calls the static function inside checkbox class to render all the checkboxes
  Checkbox.renderAllCheckboxes(checkboxArray);
}


//! Mouse clicked
function mouseClicked() {
  // Calls the static function inside the button class to handle when the buttons in an array are clicked
  // Button.handleButtonClicks(buttonArray);

  // Calls the static function inside the checkbox class to handle all the mouse clicks
  Checkbox.handleCheckboxClicks(checkboxArray);
}
