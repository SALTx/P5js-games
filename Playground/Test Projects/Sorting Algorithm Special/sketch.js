// Globals
let isSorting = false;

let oscillator; // Holds the oscillator object
let frequency = 432; // the frequency the sound should play at
let isPlaying = false; // Boolean that controls if the sound is playing

function setup() {
  createCanvas(400, 400).parent("canvas-container");
  background(220);

  // set the framerate
  frameRate(20);

  // Init oscillator
  oscillator = new p5.Oscillator();
  oscillator.start();
  isPlaying = true;

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
