// Testing sprite sheets

// Holds spriteSheet object
let mySpriteSheet;

async function setup() {
  createCanvas(400, 400);
  background(220);

  SpriteSheet.addSpriteSheet("dungeon", new SpriteSheet(await loadImage('Resources/dungeon_tilemap.png'), 11, 12));
}

function draw() {
  background(220); // Reset the background

  // Draw the knight sprite (8, 0)
  SpriteSheet.getSpriteSheet("dungeon").drawSprite(8, 0, 200, 200, 50, 50);
}
