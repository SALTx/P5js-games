// Testing sprite sheets


// holds the sprite image
let sprite;

// Holds spriteSheet object
let mySpriteSheet;

async function setup() {
  createCanvas(400, 400);
  background(220);

  sprite = await loadImage('Resources/dungeon_tilemap.png');
  mySpriteSheet = new SpriteSheet(sprite, 11, 12);

}

function draw() {
  background(220); // Reset the background

  let mySpriteWidth = 400/12;
  let mySpriteHeight = 400/11;

  for(let i = 0; i < mySpriteSheet.columns; ++i) {
    for(let j = 0; j < mySpriteSheet.rows; ++j) {
      mySpriteSheet.drawSprite(i, j, mySpriteWidth * j, mySpriteHeight * i, mySpriteWidth/1.5, mySpriteHeight/1.5);
    }
  }
}
