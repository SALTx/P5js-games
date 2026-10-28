//! Class Fella

class Fella {
    // Just an x and y for now for where the fella spawns on the canvas
    consructor(x, y) {
        this.x = x;
        this.y = y;
    }

    render() {
        // Draw the fella on the canvas


        // Just a small ellipse for now, might replace with a cute sprite soon
        ellipse(this.x, this.y, 50, 50);
    }
}