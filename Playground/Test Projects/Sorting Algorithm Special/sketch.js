// Globals
let isSorting = false;

let oscillator; // Holds the oscillator object
let isPlaying = false; // Boolean that controls if the sound is playing

function setup() {
  createCanvas(400, 400).parent("canvas-container");
  background(220);

  // set the framerate
  frameRate(20);

  // Init oscillator
  oscillator = new p5.Oscillator();

  // Populate the sort array with values
  Sort.populateArray();
}



function draw() {
  // Reset background
  background(220);

  Sort.renderArray();

  if(isSorting) {
    Sort.insertionSort();
  }
}
