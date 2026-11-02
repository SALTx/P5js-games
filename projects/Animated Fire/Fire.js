//! class Fire

class Fire {
    constructor(x, y, temperature = 1, hue = [255, 0, 0]) {
        this.x = x;
        this.y = y;
        this.temperature = temperature; // a value between 0 and 1;
        this.hue = hue; // defaults to red. the color of the fire
    }

    // Static values and functions
    static width = 10;
    static height = 10;

    static fireArray = [];

    static initializeArray() {
        // Clear the array 
        Fire.fireArray = [];

        // calculate some values
        // TODO: Change it to dynamically calculate based on the width of the canvas and the fire object
        const cols = 10;
        const rows = 10;

        // Push the base row of the fire

        let pushArray = [];
        for(let i = 0; i < cols; i++) {
            pushArray.push(new Fire(200, 200)); // Temperature defaults to 1
        }
        this.fireArray.push(pushArray);
    }

    static drawFire() {
        
    }

    update() {
        // Update logic

        // Coerce temperature value between 0 and 1
        if(this.temperature < 0) this.temperature = 0;
        if(this.temperature > 1) this.temperature = 1;
    }

    render() {
        // fill
        fill(this.hue);
        rect(this.x, this.y, Fire.width, Fire.height);
    }
}
