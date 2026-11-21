// Demo for the UI elements: a small control panel that drives the fella on the right

// Layout
const PANEL = { x: 20, y: 20, w: 270, h: 400 };
const STAGE = { x: 310, y: 20, w: 310, h: 400 };
const GOAL_DISTANCE = 3000; // px the fella has to walk to fill the progress bar

// Every UI element lives in here, rendered in order (later = on top)
let ui = [];
let nameBox, speedSlider, showCheckbox, tagCheckbox, walkBar;

// Testing my fella
let myFella = new Fella(STAGE.x + STAGE.w / 2, STAGE.y + STAGE.h / 2);
let distanceWalked = 0;

//! Setup
function setup() {
  createCanvas(640, 440);

  const left = PANEL.x + 20;
  const inner = PANEL.w - 40;

  nameBox = new TextBox(left, 92, inner, 38);
  nameBox.placeholder = 'Name your fella';
  nameBox.maxLength = 16;

  speedSlider = new Slider(left, 168, inner, 24);
  speedSlider.value = 0.45;

  showCheckbox = new Checkbox(left, 214, true);
  showCheckbox.label = 'Show fella';

  tagCheckbox = new Checkbox(left, 250, true);
  tagCheckbox.label = 'Show name tag';

  walkBar = new ProgressBar(left, 320, inner - 48, 10);
  walkBar.showLabel = true;

  const resetButton = new Button(left, 362, (inner - 10) / 2, 38, 'Reset', resetFella);
  const randomButton = new Button(left + (inner + 10) / 2, 362, (inner - 10) / 2, 38, 'Random', () => {
    myFella.x = random(STAGE.x + 25, STAGE.x + STAGE.w - 25);
    myFella.y = random(STAGE.y + 25, STAGE.y + STAGE.h - 25);
  });
  // A secondary look is just a different style
  randomButton.style = new UIStyle([226, 232, 240], [203, 213, 225]);
  randomButton.textStyle.primaryColor = UITheme.text;

  ui = [nameBox, speedSlider, showCheckbox, tagCheckbox, walkBar, resetButton, randomButton];
}

function resetFella() {
  myFella.x = STAGE.x + STAGE.w / 2;
  myFella.y = STAGE.y + STAGE.h / 2;
  distanceWalked = 0;
}

//! Draw
function draw() {
  background(241, 245, 249);

  updateFella();
  drawStage();
  drawPanel();

  UIElement.renderAll(ui);
}

// Move the fella with the arrow keys (not while typing in the text box)
function updateFella() {
  myFella.speed = round(1 + speedSlider.value * 9);
  tagCheckbox.disabled = !showCheckbox.checked;

  if (!UIElement.focused && showCheckbox.checked) {
    const keys = {};
    for (const k of [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW]) keys[k] = keyIsDown(k);

    const oldX = myFella.x, oldY = myFella.y;
    myFella.handleMovement(keys);
    myFella.x = constrain(myFella.x, STAGE.x + 25, STAGE.x + STAGE.w - 25);
    myFella.y = constrain(myFella.y, STAGE.y + 25, STAGE.y + STAGE.h - 25);
    distanceWalked += dist(oldX, oldY, myFella.x, myFella.y);
  }

  walkBar.setProgress(distanceWalked, GOAL_DISTANCE);
}

function drawCard(box) {
  UIElement.shadow(16, 4, 0.08);
  noStroke();
  fill(255);
  rect(box.x, box.y, box.w, box.h, 14);
  UIElement.noShadow();
}

function drawStage() {
  drawCard(STAGE);

  if (showCheckbox.checked) {
    noStroke();
    myFella.render();

    if (tagCheckbox.checked) {
      fill(UITheme.text);
      textFont(UITheme.font);
      textSize(14);
      textAlign(CENTER, BOTTOM);
      text(nameBox.txt || 'Fella', myFella.x, myFella.y - 32);
    }
  }

  fill(UITheme.muted);
  noStroke();
  textFont(UITheme.font);
  textSize(13);
  textAlign(CENTER, BOTTOM);
  text('Arrow keys to move', STAGE.x + STAGE.w / 2, STAGE.y + STAGE.h - 14);
}

function drawPanel() {
  drawCard(PANEL);

  const left = PANEL.x + 20;
  const right = PANEL.x + PANEL.w - 20;
  noStroke();
  textFont(UITheme.font);
  textAlign(LEFT, BASELINE);

  fill(UITheme.text);
  textStyle(BOLD);
  textSize(20);
  text('UI Elements', left, 56);
  textStyle(NORMAL);

  // Field labels
  fill(100, 116, 139);
  textSize(13);
  text('Name', left, 84);
  text('Speed', left, 160);
  text(walkBar.value >= 1 ? 'Goal reached!' : 'Distance walked', left, 310);

  textAlign(RIGHT, BASELINE);
  fill(UITheme.text);
  text(myFella.speed, right, 160);
}
