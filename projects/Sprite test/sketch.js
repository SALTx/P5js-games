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
  image(sprite, 0, 0);

}
