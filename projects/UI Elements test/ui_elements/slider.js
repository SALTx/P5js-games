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

        // holding values
        this.completion = 0.0; // float value between 0 and 1 
    }

    // static values for tracking
    static selectedSlider = null;


    // helper function to select the current slider (Under MousePressed)
    select() {
        if(Slider.selectedSlider == null) {
            let xOverlap = mouseX > this.x && mouseX < (this.x + this.width);
            let yOverlap = mouseY > this.y && mouseY < (this.y + this.height);

            if(xOverlap && yOverlap) Slider.selectedSlider = this;
        } else if(Slider.selectedSlider == this) {
            this.completion = (mouseX - this.x) / this.width;
        }

        // coerce completion value
        if(this.completion < 0) this.completion = 0;
        if(this.completion > 1) this.completion = 1;
    }


    render() {
        // background rectangle
        fill(0, 0, 0); // Black fill for the background
        rect(this.x, this.y, this.width, this.height);

        // Slider value
        fill(255, 0, 0); // TODO: using red right now just to test
        
        // for debugging, if this is selected, change the slider fill to green
        if(Slider.selectedSlider == this) fill(0, 255, 0);
        
        rect(this.x, this.y, this.width * this.completion, this.height);

        if(mouseIsPressed) {
            this.select();
        } else {
            if(Slider.selectedSlider == this) Slider.selectedSlider = null;
        }
    }
}
