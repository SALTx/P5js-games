// class progress bar
// REQUIRES: ui-styles.js


//! ProgressBar class
class ProgressBar {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // set the default style
        this.style = new UIStyle(
            [255, 0, 0],    // primary color [Red]
            [0, 0, 0],      // secondary color [Black] the background color
        )

        // Set the default stroke style
        this.strokeStyle = new StrokeStyle(
            [59, 15, 57],   // primary color [purple-ish]
            [0, 0, 0],      // secondary color [black]
            7,  // stroke weight [7px]
        );
    }

    //* Static function to render all the progress bars
    static renderAllProgressBars(arr) {
        for(let bar of arr) {
            bar.render();
        }
    }

    // helper function to calculate the percentage of completion
    // RETRUNS a value between 0 and 1
    getCompletion(currentValue, totalValue) {
        return currentValue / totalValue;
    }

    // The main function that draws the progress bar
    render() {
        // Set the stroke
        // TODO: Remove this part, I decided to get rid of the stroke in favoru of the backgroudn rect acting as the stroke
        // stroke(this.strokeStyle.primaryColor);
        // if(this.strokeStyle.weight <= 0) noStroke();
        // else { strokeWeight(this.strokeStyle.weight); }

        // Reset stroke 
        noStroke();

        // draw the background
        fill(this.style.secondaryColor);
        rect(this.x, this.y, this.width, this.height);

        // clear the stroke for the bar
        noStroke();

        // Calculations for the coordinates for foreground bar
        let value; // <-- requires a pointer to reference

        const maxWidth = this.width - this.strokeStyle.weight;
        let fX = this.x + this.strokeStyle.weight / 2;
        let fY = this.y + this.strokeStyle.weight / 2;

        // draw the foreground bar
        fill(this.style.primaryColor);
        rect(fX, fY, this.width / 2, this.height);
    }

}
