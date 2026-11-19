// class checkbox
// REQUIRES: ui-styles.js, ui-element.js

//! Checkbox class
// style.primaryColor = color when checked, style.secondaryColor = color when unchecked
class Checkbox extends UIElement {
    constructor(x, y, checked = false, onChange = () => {}) {
        super(x, y, 24, 24); // change width / height after creating to resize the box
        this.checked = checked;
        this.onChange = onChange;
        this.label = '';     // optional text drawn to the right, clicking it also toggles
        this.labelGap = 10;

        this.cornerRadius = 6;
        this.style = new UIStyle(UITheme.accent, UITheme.surface);
        this.checkT = checked ? 1 : 0; // animates the tick
    }

    // Old name for `checked`
    get enabled() { return this.checked; }
    set enabled(v) { this.checked = v; }

    // The clickable area grows to include the label
    getBounds() {
        const b = super.getBounds();
        if (this.label) {
            push();
            this.applyTextStyle();
            b.w += this.labelGap + textWidth(this.label);
            pop();
        }
        return b;
    }

    onClick() {
        this.checked = !this.checked;
        this.onChange(this.checked);
    }

    draw(b) {
        this.checkT += ((this.checked ? 1 : 0) - this.checkT) * 0.3;

        const size = b.h;
        const box = { left: b.left, top: b.top, w: size, h: size };

        this.drawFocusRing(box, this.hoverT * 0.8);

        // Box: fills with the checked color, outline follows it
        const fillColor = UIElement.mix(this.style.secondaryColor, this.style.primaryColor, this.checkT);
        const resting = UIElement.mix(this.strokeStyle.primaryColor, this.strokeStyle.secondaryColor, this.hoverT);
        const outline = UIElement.mix(resting, this.style.primaryColor, this.checkT);
        this.drawBox(box, fillColor, outline, this.strokeStyle.weight);

        // Tick
        if (this.checkT > 0.01) {
            noFill();
            stroke([...UITheme.onAccent.slice(0, 3), 255 * this.checkT]);
            strokeWeight(size * 0.11);
            strokeCap(ROUND);
            strokeJoin(ROUND);
            beginShape();
            vertex(box.left + size * 0.27, box.top + size * 0.53);
            vertex(box.left + size * 0.43, box.top + size * 0.69);
            vertex(box.left + size * 0.74, box.top + size * 0.33);
            endShape();
        }

        if (this.label) {
            this.drawLabel(this.label, box.left + size + this.labelGap, box.top + size / 2, undefined, LEFT);
        }
    }
}
