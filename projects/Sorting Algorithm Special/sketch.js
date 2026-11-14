
function setup() {
  createCanvas(400, 400).parent("canvas-container");
  background(220);

  // Populate the sort array with values
  Sort.populateArray(10);
}



function draw() {
  Sort.renderArray();
}
