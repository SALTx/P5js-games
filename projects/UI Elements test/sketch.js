// alert
function saySomething() {
  alert("Thats not what I said");
}


// new buttons array
let buttonArray = [] // empty array, initialized in the init function 


//! Setup
function setup() {
  createCanvas(400, 400);
  background(220);

  // configure text
  textAlign(CENTER, CENTER);

  // initialize buttons
  buttonArray.push(new Button(100, 100, 100, 50, "Button 1", saySomething));
  buttonArray.push(new Button(100, 160, 100, 50, "Button 2", saySomething));
}

//! Draw
function draw() {
  Button.renderAllButtons(buttonArray);
}


//! Mouse clicked
function mouseClicked() {
  Button.handleButtonClicks(buttonArray);
}
