//! Text mode must be CENTER

class Button {
    constructor(x, y, width, height, text, onClick) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.onClick = onClick;
    }

    draw() {
        if(this.isMouseInside()) {
            fill(255, 0, 0);
        } else {
            fill(255, 255, 0);
        }
        rect(this.x, this.y, this.width, this.height);
        fill(0);
        textSize(20);
        text(this.text, this.x + this.width / 2, this.y + this.height / 2);
    }

    // helper to determine if mouse is within button
    isMouseInside() {
        return mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height;
    }
}