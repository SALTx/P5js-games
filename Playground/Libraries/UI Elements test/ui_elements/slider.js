// class Slider
// REQUIRES: ui-styles.js, ui-element.js

//! Slider class
// Read / write slider.value (between 0 and 1). onChange(value) fires while it is being dragged
class Slider extends RangeElement {
    constructor(x, y, width, height, onChange = () => {}) {
        super(x, y, width, height);
        this.onChange = onChange;
        this.trackHeight = 6;
    }

    // Old name for `value`
    get completion() { return this.value; }
    set completion(v) { this.value = v; }

    knobRadius(b) {
        return min(b.h / 2, 12);
    }

    // Runs every frame the mouse is held after pressing the slider, even if it leaves the box
    onDrag(b) {
        const r = this.knobRadius(b);
        const before = this.value;
        this.value = (mouseX - b.left - r) / (b.w - r * 2);
        if (this.value !== before) this.onChange(this.value);
    }

    draw(b) {
        const r = this.knobRadius(b);
        const knobX = b.left + r + (b.w - r * 2) * this.value;
        const midY = b.top + b.h / 2;
        const engaged = max(this.hoverT, this.pressT);

        // Track, filled up to the knob
        const color = UIElement.mix(this.style.primaryColor, this.style.secondaryColor, engaged);
        const trackH = min(this.trackHeight, b.h);
        const track = { left: b.left, top: midY - trackH / 2, w: b.w, h: trackH };
        this.drawTrack(track, (knobX - b.left) / b.w, color);

        // Halo while dragging
        if (this.pressT > 0.01) {
            noStroke();
            fill([...color.slice(0, 3), 50 * this.pressT]);
            circle(knobX, midY, (r + 6 * this.pressT) * 2);
        }

        // Knob
        UIElement.shadow(5, 1, 0.3);
        fill(UITheme.surface);
        stroke(color);
        strokeWeight(2);
        circle(knobX, midY, (r - 1 + engaged) * 2);
    }
}
