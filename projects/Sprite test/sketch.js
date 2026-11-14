// Globals
const ANIMATION_FRAMES = 60;

// Testing sprite sheets

let animationFrame = 0;

async function setup() {
  createCanvas(400, 400);
  background(220);

  // Makes the graphic not use anti aliasing
  noSmooth();

  // set the frame rate to be lower
  frameRate(10);

  // Add some sprite sheets to the SpriteSheet container
  SpriteSheet.addSpriteSheet("dungeon", new SpriteSheet(await loadImage('Resources/dungeon_tilemap.png'), 11, 12));
  SpriteSheet.addSpriteSheet("man", new SpriteSheet(await loadImage('Resources/man_animations.png'), 8, 13));

  // Add the man animations to the container
  SpriteSheet.addAnimation(SpriteSheet.getSpriteSheet("man"), "man_idle", [0, 0], [0, 12], ANIMATION_FRAMES);
  SpriteSheet.addAnimation(SpriteSheet.getSpriteSheet("man"), "man_walk", [0, 0], [0, 7], ANIMATION_FRAMES);
}

function draw() {
  background(220); // Reset the background

  // // Draw bounding box to show where the sprite is actually being drawn
  // fill(255, 255, 0);
  // rect(100, 100, 100, 100);

  // // Draw the first man animation
  // animationFrame++;
  // SpriteSheet.getSpriteSheet("man").drawSprite(0, animationFrame%13, 100, 100, 100, 100);

  SpriteSheet.drawAnimation("man_idle", 100, 100, 100, 100);
  SpriteSheet.drawAnimation("man_walk", 300, 100, 100, 100);
}
