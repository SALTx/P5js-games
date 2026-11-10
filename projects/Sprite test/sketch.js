// Testing sprite sheets

let animationFrame = 0;

async function setup() {
  createCanvas(400, 400);
  background(220);

  // set the frame rate to be lower
  frameRate(10);

  // Add some sprite sheets to the SpriteSheet container
  SpriteSheet.addSpriteSheet("dungeon", new SpriteSheet(await loadImage('Resources/dungeon_tilemap.png'), 11, 12));
  SpriteSheet.addSpriteSheet("man", new SpriteSheet(await loadImage('Resources/man_animations.png'), 8, 13));
}

function draw() {
  background(220); // Reset the background

  // Draw the first man animation
  animationFrame++;
  SpriteSheet.getSpriteSheet("man").drawSprite(0, animationFrame%13, 200, 200, 100, 100);
}
