// alert
function saySomething() {
  alert("Thats not what I said");
}


// new buttons array
let buttonArray = [
  new Button(100, 100, 100, 50, "Button 1", saySomething),
  new Button(100, 170, 100, 50, "Button 2", saySomething),
  new Button(100, 240, 100, 50, "Button 3", saySomething),
]

// function to draw all buttons from the array
function drawAllButtons() {
  for(let button of buttonArray) {
    button.render();
  }
}

// function to handle all the clicks 
function handleButtonClicks() {
  for(let button of buttonArray) {
    button.onClick();
  }
}

//! Setup
function setup() {
  createCanvas(400, 400);
  background(220);

  // configure text
  textAlign(CENTER, CENTER);
}

//! Draw
function draw() {
  drawAllButtons();
}


//! Mouse clicked
function mouseClicked() {
  handleButtonClicks();
}
