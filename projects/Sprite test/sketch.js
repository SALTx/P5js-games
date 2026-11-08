// Testing sprite sheets


// holds the sprite image
let sprite;


async function setup() {
  createCanvas(400, 400);
  background(220);

  sprite = await loadImage('Resources/dungeon_tilemap.png');
}

function draw() {
  background(220); // Reset the background

}
