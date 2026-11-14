
function setup() {
  createCanvas(400, 400);
  background(220);

  // Populate the sort array with values
  Sort.populateArray(5);
}



function draw() {
  Sort.renderArray();
}
