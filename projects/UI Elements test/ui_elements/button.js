// class button
// REQUIRES: ui-styles.js
// NB: This class assumes that text is rendered CENTER, CENTER

//! Button class
class Button {
    // Constructor
    constructor(x, y, width, height, txt, callback = () => { alert(`${txt} button has been clicked`)}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.txt = txt;
        this.callback = callback;

        // styles and stuffs
        // Plain RGB arrays are used because color() isn't available before p5's setup()
        this.style = new UIStyle([70, 130, 220], [100, 160, 245]);
        this.strokeStyle = new StrokeStyle([30, 60, 120], [30, 60, 120], 2);
        this.textStyle = new TextStyle([255, 255, 255], [255, 255, 255], 'Arial', 18);
    }

    // static function to render buttons of an array
    static renderAllButtons(arr) {
        for(let button of arr) {
            button.render();
        }
    }

    // static function to handle all the clicks of the buttons in an array
    static handleButtonClicks(arr) {
        for(let button of arr) {
            button.onClick();
        }
    }

    // helper function to check of the mouse is on top of the button
    isHover() {
        let xOverlap = mouseX > this.x && mouseX < this.x + this.width;
        let yOverlap = mouseY > this.y && mouseY < this.y + this.height;

        return xOverlap && yOverlap;
    }

    // The main function that draws the button
    render() {
        // set the fill color
        if(this.isHover()) {
            fill(this.style.secondaryColor); // Fill with the secondary color if hovered
        } else {
            fill(this.style.primaryColor); // Fill with primary color by default;
        }

        // Set the stroke
        if(this.strokeStyle.width <= 0) noStroke();
        else {
            stroke(this.strokeStyle.primaryColor);
            strokeWeight(this.strokeStyle.width);
        }


        // draw a rectangle
        rect(this.x, this.y, this.width, this.height);

        // draw the text on the button
        fill(this.textStyle.primaryColor); // Set the fill color to text primary color
        textFont(this.textStyle.fontName); // Broken
        textSize(this.textStyle.fontSize);
        strokeWeight(1); // Text inherits stroke 
        text(this.txt, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    // The function to call when the button is clicked
    // TODO: There is a potential problem if 2 buttons are rendered on top of each other. Both events will trigger simultaneously
    // TODO: I want to test what order it happens in, its most likely going to be whichever button comes earlier in the array has its event take place
    onClick() {
        if(this.isHover()) {
            this.callback();
        }
    }
}