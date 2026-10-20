// class button
// REQUIRES: ui-styles.js
// NB: This class assumes that text is rendered CENTER, CENTER
class Button {
    constructor(x, y, width, height, txt, callback) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.txt = txt;
        this.callback = callback;

        // styles and stuffs
        this.style = new UIStyle(color(255, 0, 0), color(0, 255, 0));
        this.textStyle = new TextStyle(color(0), color(255), 'Arial', 24);
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

    render() {
        // set the fill color
        if(this.isHover()) {
            fill(this.style.secondaryColor); // Fill with the secondary color if hovered
        } else {
            fill(this.style.primaryColor); // Fill with primary color by default;
        }


        // draw a rectangle
        rect(this.x, this.y, this.width, this.height);

        // draw the text on the button
        fill(this.txt.primaryColor); // Set the fill color to text primary color
        // textFont(this.textStyle.fontName); // Broken
        textSize(this.textStyle.fontSize);
        text(this.txt, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    onClick() {
        if(this.isHover()) {
            this.callback();
        }
    }
}