

// class button
// NB: This class assumes that text is rendered CENTER, CENTER
class Button {
    constructor(x, y, width, height, txt, callback) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.txt = txt;
        this.callback = callback;
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
            fill(0, 255, 0); // Fill with a green color
        } else {
            fill(255, 0, 0); // Fill with a red color
        }


        // draw a rectangle
        rect(this.x, this.y, this.width, this.height);

        // draw the text on the button
        fill(0); // Set the fill color to black
        text(this.txt, this.x + (this.width / 2), this.y + (this.height / 2));
    }

    onClick() {
        if(this.isHover()) {
            this.callback();
        }
    }
}