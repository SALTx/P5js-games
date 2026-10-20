// alert
function saySomething() {
  alert("RAHHHHHH");
}

// my button
let myFirstButton = new Button(200, 200, 100, 50, "RAHH", saySomething);


function setup() {
  createCanvas(400, 400);
  background(220);

  // configure text
  textAlign(CENTER, CENTER);
}

function draw() {
  myFirstButton.render();
}

function mouseClicked() {
  myFirstButton.onClick();
}
