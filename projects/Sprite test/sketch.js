// Testing sprite sheets


// holds the sprite image
let sprite;

// Holds spriteSheet object
let mySpriteSheet;

// Sprite Sheet indexes
let spriteRow = 8;
let spriteCol = 0;

async function setup() {
  createCanvas(400, 400);
  background(220);

  sprite = await loadImage('Resources/dungeon_tilemap.png');
  mySpriteSheet = new SpriteSheet(sprite, 192, 176, 11, 12);
}

function draw() {
  background(220); // Reset the background
  // Draw a sprite from the spriteSheet
  mySpriteSheet.drawSprite(spriteRow, spriteCol, 200, 200, 50, 50);
}
