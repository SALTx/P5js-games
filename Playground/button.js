// A customizable and robust button component for p5.js
//! Supports text alignment and custom colors for normnal, hover, and active states

class Button {
    constructor(
      x,
      y,
      width,
      height,
      text,
      textSize,
      onClick,
      fillColor = "#ffff00",
      hoverColor = "#ff0000",
      activeColor = "#0000ff",
      textColor = "#000000",
    ) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.text = text;
      this.textSize = textSize;
      this.onClick = onClick;
      this.fillColor = fillColor;
      this.hoverColor = hoverColor;
      this.activeColor = activeColor;
      this.textColor = textColor;
    }
  
    draw() {
      // Set the fill color based on the mouse state
      if (this.isMouseOver()) {
        if (this.isMousePressed) {
          fill(this.activeColor);
        } else {
          fill(this.hoverColor);
        }
      } else {
        fill(this.fillColor);
      }
  
      // Draw the button
      rect(this.x, this.y, this.width, this.height);
  
      fill(this.textColor);
  
      textSize(this.textSize);
      text(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }
  
    // Check if the mouse is over the button
    isMouseOver() {
      return (
        mouseX > this.x &&
        mouseX < this.x + this.width &&
        mouseY > this.y &&
        mouseY < this.y + this.height
      );
    }
  
    // Check if the mouse is pressed
    get isMousePressed() {
      return mouseIsPressed && this.isMouseOver();
    }
  }