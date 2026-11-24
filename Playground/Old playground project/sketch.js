var buttons = [];
buttons.push(new Button(100, 100, 100, 50, "Test Button", 15, function() {
    console.log(Math.random());
},));

function setup() {
    createCanvas(400, 400);
    textAlign(CENTER, CENTER);
    background(255, 0, 0);
}

function draw() {
    buttons.forEach(button => {
        button.draw();
    });
}

function mouseClicked() {
    buttons.forEach(button => {
        if (button.isMouseOver()) {
            button.onClick();
        }
    });
}