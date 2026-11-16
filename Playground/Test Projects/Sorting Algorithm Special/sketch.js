// Globals
let isSorting = false;

function setup() {
  createCanvas(400, 400).parent("canvas-container");
  background(220);

  // set the framerate
  frameRate(20);

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
