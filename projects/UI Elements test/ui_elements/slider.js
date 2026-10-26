// class Slider
// REQUIRES: ui-styles.js


//! Slider class
class Slider {
    constructor(x, y, width, height, onChange = () => {}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.onChange = onChange;

        // Default styles
        this.style = new UIStyle (
            // Primary color - The color of the bar
            [255, 0, 0], // Red by default
            // Secondary color
            [0, 255, 0], // Green when selected
        )

        // Default stroke
        this.strokeStyle = new StrokeStyle (
            [0, 0, 0], // Primary stroke (black) - The color of the background
            [0, 0, 0], // Secondary stroke (black) - Can be anything, unused value for now,
            3, // Strokeweight of 2px by default
        );

        // holding values
        this.completion = 0.0; // float value between 0 and 1 
    }

    // static values for tracking
    static selectedSlider = null;


    // helper function to select the current slider (Under MousePressed)
    select() {
        if(Slider.selectedSlider == null) {
            // If the global selected slider is null, then set it to this
            let xOverlap = mouseX > this.x && mouseX < (this.x + this.width);
            let yOverlap = mouseY > this.y && mouseY < (this.y + this.height);

            if(xOverlap && yOverlap) Slider.selectedSlider = this;
        } else if(Slider.selectedSlider == this) {
            // If this is the global selected slider, modify the value
            this.completion = (mouseX - this.x) / this.width;
        }

        // coerce completion value
        if(this.completion < 0) this.completion = 0;
        if(this.completion > 1) this.completion = 1;
    }


    render() {
        // Background
        noStroke();
        fill(this.strokeStyle.primaryColor);
        rect(this.x, this.y, this.width, this.height);

        // Slider value
        fill(this.style.primaryColor); // Fill to primary color
        if(Slider.selectedSlider == this) fill(this.style.secondaryColor); // Fill to secondary color if active
        rect(this.x, this.y, this.width * this.completion, this.height); // Draw the rectangle


        // Stroke
        noFill(); // Clear the fill to make it transparent
        stroke(this.strokeStyle.primaryColor);
        strokeWeight(this.strokeStyle.weight);
        rect(this.x, this.y, this.width, this.height);

        if(mouseIsPressed) {
            // Execute the select function when the mouse is down
            this.select();
        } else {
            // When the mouse is no longer down, release control of the global selected slider
            // only if this is the controlling slider
            if(Slider.selectedSlider == this) Slider.selectedSlider = null;
        }
    }
}
