//! Sort class
class Sort {
    constructor() {}

    // Static values
    static array = [];
    static step = 0; // The current step of the sortign process

    // Populates the array with n number of elements, also acts as a reset
    static populateArray(n = 75) {
        // Clears the array before population
        Sort.array = [];

        // Set the number of steps to 0
        Sort.step = 0;

        // Fills the array with random values 
        for(let i = 0; i < n; i++) {
            Sort.array.push(Math.floor(Math.random()*height));
        }
    }

    // Draws the array as bars
    static renderArray() {
        const barWidth = width / Sort.array.length;


        // Bar design
        noStroke();

        // Draw the bars
        for(let i = 0; i < Sort.array.length; i++) {
            fill(255, Sort.array[i], 0);
            rect(i * barWidth, height, barWidth, -Sort.array[i])
        }
    }

    static insertionSort() {
        console.log("Insertion sort is happening");
        
        let steps = 0;

        for(let i = 1; i < Sort.array.length; i++) {
            const current = Sort.array[i];

            let j = i - 1;

            while(j >= 0 && Sort.array[j] > current) {
                Sort.array[j + 1] = Sort.array[j];
                j--;
            }

            // Place 'current' into sorted position
            Sort.array[j+1] = current;

            if(isPlaying) {
                oscillator.freq(Sort.array[j+1], 0.1);
                oscillator.amp(0.5);
            }
            
            // increment the step counter
            steps++;

            if(steps >= Sort.step) {
                Sort.step++;
                return;
            }
        }

        console.log("The array is fully sorted");
    }
}
