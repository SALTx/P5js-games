
var testButton = new Button(100, 100, 100, 50, "Test Button", 15, function() {
    console.log(Math.random());
},);

function setup() {
    createCanvas(400, 400);
    textAlign(CENTER, CENTER);
    background(255, 0, 0);
}

function draw() {
    testButton.draw();
}