// class progress bar
// REQUIRES: ui-styles.js, ui-element.js

//! ProgressBar class
// Set bar.value (between 0 and 1) or call bar.setProgress(current, total)
class ProgressBar extends RangeElement {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.cursorType = ARROW; // not interactive
        this.showLabel = false;  // draw the percentage to the right of the bar
        this.shown = 0;          // what is currently drawn, eases towards value
    }

    draw(b) {
        this.shown += (this.value - this.shown) * 0.15;
        if (abs(this.value - this.shown) < 0.001) this.shown = this.value;

        this.drawTrack(b, this.shown, this.style.primaryColor);

        if (this.showLabel) {
            this.drawLabel(`${round(this.shown * 100)}%`, b.left + b.w + 10, b.top + b.h / 2, this.textStyle.secondaryColor, LEFT);
        }
    }
}
