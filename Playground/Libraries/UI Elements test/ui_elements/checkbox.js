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

        // Default styles
        this.style = new UIStyle(
            [0, 255, 0], // Primary color - Color when selected
            [255, 255, 255], // Secondary color - Color when unselected
        )

        // Default stroke style
        this.strokeStyle = new StrokeStyle(
            [0, 0, 0], // primary color - default stroke
            [0, 0, 0], // Secondary color - unused for now,
            3, // Stroke weight, default 3px
        );
    }

    // Static functions to render all the checkboxes inside a containing array
    static renderAllCheckboxes(arr) {
        for(let checkbox of arr) {
            checkbox.render();
        }
    }

    // Static function to handle all the clicks of the chcekboxes in an array
    static handleCheckboxClicks(arr) {
        for(let checkbox of arr) {
            checkbox.onClick();
        }
    }

    // Helper function to see if the mouse is over the checkbox
    isHover() {
        let xOverlap = (mouseX > this.x) && (mouseX < (this.x + this.width));
        let yOverlap = (mouseY > this.y) && (mouseY < (this.y + this.height));

        return xOverlap && yOverlap;
    }

    render() {
        // Background
        noStroke();
        fill(this.strokeStyle.primaryColor);
        rect(this.x, this.y, this.width, this.height);

        // Set the style 
        fill(this.style.secondaryColor);
        if(this.enabled) fill(this.style.primaryColor);
        rect(this.x, this.y, this.width, this.height);

        // outline
        stroke(this.strokeStyle.primaryColor);
        strokeWeight(this.strokeStyle.weight);
        noFill();
        rect(this.x, this.y, this.width, this.height);
    }

    onClick() {
        if(this.isHover()) {
            this.enabled = !this.enabled;
        }
    }
}