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
        const cols = width / Fire.width;
        const rows = height / Fire.height;

        // create an array containing an individual row
        // let pushArray = [];
        // for(let i = 0; i < cols; i++) {
        //     pushArray.push(new Fire(200, 200)); // Temperature defaults to 1
        // }
        
        // // Push all the rows into the array
        // for(let i = 0; i < rows; i++) {
        //     Fire.fireArray.push(pushArray);
        // }

        // Improved version
        let pushArray = [];
        for(let i = 0; i < rows; ++i) {
            for(let j = 0; j < cols; ++j) {
                // for the first row it should all have a temperature of 1
                if(i == 0) {
                    pushArray.push(new Fire(0 + j * Fire.width, height - i * Fire.height, 1)); // sets the temperature to 1 for the base row
                } else {
                    pushArray.push(new Fire(0 + j * Fire.width, height - i * Fire.height, 0)); // Then the remaining values dont matter
                }

            }
            Fire.fireArray.push(pushArray);
            pushArray = [];
        }
    }

    // Draws the actual fire
    static drawFire() {
        for (let row of Fire.fireArray) {
            for (let fire of row) {
                fire.render();
            }
        }
    }

    // Update all the rows
    static updateFire() {
        // wind constant
        const windOffset = 1;

        // Start at row 1: row 0 has no previous row, so it acts as the heat source
        for(let i = 1; i < Fire.fireArray.length; ++i) {
            const row = Fire.fireArray[i];
            const prevRow = Fire.fireArray[i - 1];
            for(let j = 0; j < row.length; ++j) {
                // Take the temperature of the fire at the same position in the previous row, minus a random decay
                if(j <= windOffset) {
                    row[j].temperature = Math.max(0, prevRow[j].temperature - Math.random() * 0.05);
                } else {
                    row[j].temperature = Math.max(0, prevRow[j - windOffset].temperature - Math.random() * 0.05);
                }
            }
        }
    }

    update() {
        // Update logic

        // Coerce temperature value between 0 and 1
        if(this.temperature < 0) this.temperature = 0;
        if(this.temperature > 1) this.temperature = 1;
    }

    render() {
        // fill
        fill(this.hue.map(hue => hue * this.temperature));
        rect(this.x, this.y, Fire.width, Fire.height);
    }
}
