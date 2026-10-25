// class button
// REQUIRES: ui-styles.js
// NB: Handles the caller's rectMode automatically; text alignment is forced to CENTER, CENTER while rendering

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

        // Default colors
        this.style = new UIStyle(
            // Primary color 
            [37, 99, 235], 
            // Secondary color - On hover
            [29, 78, 216]
        );

        // Default stroke settings
        this.strokeStyle = new StrokeStyle([0, 0, 0], [0, 0, 0], 1);
        
        // Default text style
        this.textStyle = new TextStyle(
            [255, 255, 255], 
            [255, 255, 255], 
            'Arial', 
            18
        );
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
    // Converts x, y, width, height as interpreted by the current rectMode into a top-left based box
    getBounds() {
        // Use the mode from the last render so click events (fired outside draw) match what was drawn
        switch (this.renderRectMode ?? rectMode()) {
            case CENTER:
                return { left: this.x - this.width / 2, top: this.y - this.height / 2, w: this.width, h: this.height };
            case RADIUS: // width/height are half-extents
                return { left: this.x - this.width, top: this.y - this.height, w: this.width * 2, h: this.height * 2 };
            case CORNERS: // width/height are the opposite corner's x2/y2
                return {
                    left: min(this.x, this.width), top: min(this.y, this.height),
                    w: abs(this.width - this.x), h: abs(this.height - this.y)
                };
            case CORNER:
            default:
                return { left: this.x, top: this.y, w: this.width, h: this.height };
        }
    }

    isHover() {
        const b = this.getBounds();
        let xOverlap = mouseX > b.left && mouseX < b.left + b.w;
        let yOverlap = mouseY > b.top && mouseY < b.top + b.h;

        return xOverlap && yOverlap;
    }

    // The main function that draws the button
    render() {
        // Resolve the bounds (and hover state) before changing any modes
        this.renderRectMode = rectMode();
        const b = this.getBounds();
        const hovered = this.isHover();

        // Isolate our rect/text modes so the caller's settings are untouched
        push();
        rectMode(CORNER);
        textAlign(CENTER, CENTER);

        // set the fill color
        if(hovered) {
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
        rect(b.left, b.top, b.w, b.h);

        // draw the text on the button
        fill(this.textStyle.primaryColor); // Set the fill color to text primary color
        textFont(this.textStyle.fontName); // Broken
        textSize(this.textStyle.fontSize);
        strokeWeight(1); // Text inherits stroke 
        text(this.txt, b.left + b.w / 2, b.top + b.h / 2);

        pop();
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