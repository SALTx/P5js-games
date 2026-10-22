// class checkbox
// REQUIRES ui-styles.js


//! Checbox class
class Checkbox {
    // TODO: See if necessary to include a width and height
    constructor(x, y, enabled = false) {
        this.x = x;
        this.y = y;
        this.enabled = enabled; // Im pretty sure this needs to be a pointer but I have to figure out how it works in js 
    
        // consts
        this.width = 50;
        this.height = 50;
    }

    // Helper function to see if the mouse is over the checkbox
    isHover() {
        let xOverlap = (mouseX > this.x) && (mouseX < (this.x + this.width));
        let yOverlap = (mouseY > this.y) && (mouseY < (this.y + this.height));

        return xOverlap && yOverlap;
    }

    render() {
        // Set the style 
        fill(255, 255, 255);
        stroke(0, 0, 0)
        strokeWeight(2);

        // Draw the background square
        rect(this.x, this.y, 50, 50);

        // If the checkbox is checked then draw the overlaying smaller square
        if(this.enabled) {
            fill(0, 255, 0);
            // TODO: its supposed to be smaller and centered, but ill do the math later
            rect(this.x, this.y, this.width, this.height);
        }
    }

    onClick() {
        if(this.isHover()) {
            this.enabled = !this.enabled;
        }
    }
}