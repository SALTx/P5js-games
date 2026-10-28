//! Class Fella

class Fella {
    // Just an x and y for now for where the fella spawns on the canvas
    consructor(x, y) {
        this.x = x;
        this.y = y;

        // stats
        this.speed = 5; // moves at 5 units per frame
    }

    // Function to handle movement
    handleMovement(arr) {
        // Checks if some keys are pressed based on the given key array
        if(arr[UP_ARROW]) this.y -= this.speed;
        if(arr[DOWN_ARROW]) this.y += this.speed;

        if(arr[LEFT_ARROW]) this.x -= this.speed;
        if(arr[RIGHT_ARROW]) this.x += this.speed;
    }

    render() {
        // Draw the fella on the canvas


        // Just a small ellipse for now, might replace with a cute sprite soon
        ellipse(this.x, this.y, 50, 50);
    }
}