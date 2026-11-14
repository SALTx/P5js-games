//! Sort class

class Sort {
    constructor() {

    }

    // Static values
    static array = [];

    // Populates the array with n number of elements
    static populateArray(n) {
        for(let i = 0; i < n; i++) {
            Sort.array.push(Math.floor(Math.random()*100));
        }
    }

    // Draws the array as bars
    static renderArray() {
        const barWidth = width / Sort.array.length;


        // Bar design
        stroke(180, 180, 0);
        fill(255, 255, 0);

        // Draw the bars
        for(let i = 0; i < Sort.array.length; i++) {
            rect(i * barWidth, height, barWidth, -Sort.array[i])
        }
    }
}