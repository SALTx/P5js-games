// Testing sprite sheets


// holds the sprite
let sprite;


async function setup() {
  createCanvas(400, 400);
  background(220);

  sprite = await loadImage('Resources/dungeon_tilemap.png');
}

function draw() {
  background(220); // Reset the background

  // Draw the sprite sheet
  let imageWidth = 400;
  let imageHeight = 400;
  let imageColumns = 12;
  let imageRows = 12;

  // indexes
  let rowIndex = 2;
  let colIndex = 2;

  image(sprite, 0, 0, imageWidth, imageHeight, imageWidth/imageColumns*2 * colIndex, imageHeight/imageRows*2 * rowIndex, imageWidth / imageColumns, imageHeight / imageRows);

}
