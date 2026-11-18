// class button
// REQUIRES: ui-styles.js, ui-element.js

//! Button class
// style.primaryColor = resting color, style.secondaryColor = hovered color
// If two buttons overlap, only the one rendered last (the one on top) gets the click
class Button extends UIElement {
    constructor(x, y, width, height, txt, callback = () => {}) {
        super(x, y, width, height);
        this.txt = txt;
        this.callback = callback;

        this.textStyle = new TextStyle(UITheme.onAccent, UITheme.onAccent, UITheme.font, UITheme.fontSize);
    }

    onClick() {
        this.callback();
    }

    draw(b) {
        // Blend towards the hover color, then darken slightly while held down
        let color = UIElement.mix(this.style.primaryColor, this.style.secondaryColor, this.hoverT);
        color = UIElement.mix(color, [0, 0, 0], 0.18 * this.pressT);

        // The button sinks 1px and loses its shadow as it is pressed
        const box = { ...b, top: b.top + this.pressT };
        UIElement.shadow(6 + 4 * this.hoverT - 8 * this.pressT, 2 + this.hoverT - 2 * this.pressT, 0.25);
        this.drawBox(box, color);
        UIElement.noShadow();

        this.drawLabel(this.txt, box.left + box.w / 2, box.top + box.h / 2);
    }
}
