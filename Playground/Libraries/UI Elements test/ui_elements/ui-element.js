// class UIElement - the base class every UI element inherits from
// REQUIRES: ui-styles.js
//
// What the base class takes care of, so subclasses don't have to:
//   - position / size, and converting them to a top-left box for whatever rectMode the caller is in
//   - default styles
//   - hover detection, including which element is on top when several overlap
//   - press / drag / click / focus tracking (it listens for the mouse itself, so no mouseClicked() wiring)
//   - keyboard routing to the focused element
//   - hover / press / focus animation values
//   - isolating drawing state with push() / pop()
//
// A subclass normally only implements draw(b), plus whichever of the on___ hooks it cares about.
// The sketch only has to call element.render() (or UIElement.renderAll(array)) every frame.

//! UIElement class
class UIElement {
    //* Shared interaction state
    static hot = null;          // topmost element under the mouse (resolved from the previous frame)
    static active = null;       // element the mouse was pressed on, held until release
    static focused = null;      // element receiving keyboard input
    static released = null;     // element the mouse was just released from (valid for one frame)
    static justPressed = false; // true for the one frame the mouse went down

    static manageCursor = true; // set to false if the sketch wants to control the cursor itself

    static _frame = -1;
    static _candidate = null;
    static _isDown = false;
    static _pendingPress = false;
    static _pendingRelease = false;
    static _cursor = null;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.visible = true;
        this.disabled = false;   // drawn faded and ignores input
        this.focusable = false;  // true for elements that take keyboard input
        this.cursorType = HAND;  // cursor shown while hovered
        this.cornerRadius = UITheme.radius;

        // Default styles, subclasses override the ones they want different
        this.style = new UIStyle(UITheme.accent, UITheme.accentHover);
        this.strokeStyle = new StrokeStyle(UITheme.border, UITheme.accent, 1.5);
        this.textStyle = new TextStyle(UITheme.text, UITheme.muted, UITheme.font, UITheme.fontSize);

        // Animation values, each eases between 0 and 1
        this.hoverT = 0;
        this.pressT = 0;
        this.focusT = 0;
    }

    //* Render every element of an array. Inherited, so Button.renderAll(arr) etc. also work
    static renderAll(arr) {
        for (const element of arr) element.render();
    }

    // Blend two color arrays. t = 0 gives a, t = 1 gives b
    static mix(a, b, t) {
        return [
            a[0] + (b[0] - a[0]) * t,
            a[1] + (b[1] - a[1]) * t,
            a[2] + (b[2] - a[2]) * t,
            (a[3] ?? 255) + ((b[3] ?? 255) - (a[3] ?? 255)) * t,
        ];
    }

    // Soft drop shadow for whatever is drawn next. Call noShadow() to turn it back off
    static shadow(blur, offsetY, alpha = 0.2) {
        const [r, g, b] = UITheme.shadow;
        drawingContext.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        drawingContext.shadowBlur = blur;
        drawingContext.shadowOffsetY = offsetY;
    }

    static noShadow() {
        drawingContext.shadowColor = 'transparent';
        drawingContext.shadowBlur = 0;
        drawingContext.shadowOffsetY = 0;
    }

    // Runs once per frame (triggered by the first element rendered that frame)
    // Elements report themselves while rendering; the last one to report is the one drawn on top
    static _sync() {
        if (frameCount === UIElement._frame) return;
        UIElement._frame = frameCount;

        UIElement.hot = UIElement._candidate;
        UIElement._candidate = null;

        // Presses and releases are queued by the pointer listeners at the bottom of this file, and
        // handled one per frame so a click shorter than a frame still registers as press then release
        UIElement.justPressed = false;
        let justReleased = false;
        if (UIElement._isDown) {
            if (UIElement._pendingRelease) {
                justReleased = true;
                UIElement._isDown = false;
                UIElement._pendingRelease = false;
            }
        } else if (UIElement._pendingPress) {
            UIElement.justPressed = true;
            UIElement._isDown = true;
            UIElement._pendingPress = false;
        } else {
            UIElement._pendingRelease = false;
        }

        UIElement.released = null;
        if (UIElement.justPressed) {
            const hot = UIElement.hot;
            UIElement.active = hot;
            UIElement.setFocus(hot && hot.focusable && !hot.disabled ? hot : null);
        } else if (justReleased) {
            UIElement.released = UIElement.active;
            UIElement.active = null;
        }

        if (UIElement.manageCursor) {
            const owner = UIElement.active ?? UIElement.hot;
            const type = owner && !owner.disabled ? owner.cursorType : ARROW;
            if (type !== UIElement._cursor) {
                UIElement._cursor = type;
                cursor(type);
            }
        }
    }

    // Move keyboard focus to an element (or null to clear it)
    static setFocus(element) {
        if (UIElement.focused === element) return;
        UIElement.focused?.onBlur();
        UIElement.focused = element;
        element?.onFocus();
    }

    //* Geometry

    // Converts x, y, width, height as interpreted by the caller's rectMode into a top-left based box
    getBounds() {
        // Uses the mode from the last render so checks made outside draw() match what was drawn
        switch (this._rectMode ?? rectMode()) {
            case CENTER:
                return { left: this.x - this.width / 2, top: this.y - this.height / 2, w: this.width, h: this.height };
            case RADIUS: // width/height are half-extents
                return { left: this.x - this.width, top: this.y - this.height, w: this.width * 2, h: this.height * 2 };
            case CORNERS: // width/height are the opposite corner's x2/y2
                return {
                    left: min(this.x, this.width), top: min(this.y, this.height),
                    w: abs(this.width - this.x), h: abs(this.height - this.y)
                };
            case CORNER:
            default:
                return { left: this.x, top: this.y, w: this.width, h: this.height };
        }
    }

    // Is the mouse inside the element's box (ignores anything drawn on top of it)
    isHover(b = this.getBounds()) {
        return mouseX > b.left && mouseX < b.left + b.w && mouseY > b.top && mouseY < b.top + b.h;
    }

    //* State

    // Hovered and nothing is covering it, and no other element is mid-drag
    get isHovered() {
        return UIElement.hot === this && (UIElement.active === null || UIElement.active === this);
    }

    get isPressed() { return UIElement.active === this; }
    get isFocused() { return UIElement.focused === this; }

    //* Hooks for subclasses, all optional except draw
    draw(b) {}        // draw the element inside the box b = { left, top, w, h }
    onPress(b) {}     // mouse went down on this element
    onDrag(b) {}      // every frame the mouse stays down after pressing this element
    onClick(b) {}     // mouse pressed and released on this element
    onFocus() {}
    onBlur() {}
    onKey(key) { return false; } // key pressed while focused, return true if it was used

    //* The main function, call once per frame. Subclasses override draw(), not this
    render() {
        if (!this.visible) return;
        UIElement._sync();

        this._rectMode = rectMode();
        const b = this.getBounds();
        if (this.isHover(b)) UIElement._candidate = this;

        if (!this.disabled) {
            if (UIElement.justPressed && this.isPressed) this.onPress(b);
            if (this.isPressed) this.onDrag(b);
            if (UIElement.released === this && UIElement.hot === this) this.onClick(b);
        }

        const interactive = !this.disabled;
        this.hoverT += ((interactive && this.isHovered ? 1 : 0) - this.hoverT) * 0.25;
        this.pressT += ((interactive && this.isPressed ? 1 : 0) - this.pressT) * 0.4;
        this.focusT += ((interactive && this.isFocused ? 1 : 0) - this.focusT) * 0.3;

        // Isolate our drawing state so the caller's settings are untouched
        push();
        rectMode(CORNER);
        ellipseMode(CENTER);
        const alpha = drawingContext.globalAlpha;
        if (this.disabled) drawingContext.globalAlpha = alpha * 0.45;

        this.draw(b);

        UIElement.noShadow();
        drawingContext.globalAlpha = alpha;
        pop();
    }

    //* Drawing helpers shared by the subclasses

    // Filled rounded box with an optional outline
    drawBox(b, fillColor, strokeColor = null, weight = 0, radius = this.cornerRadius) {
        if (fillColor) fill(fillColor); else noFill();
        if (strokeColor && weight > 0) {
            stroke(strokeColor);
            strokeWeight(weight);
        } else noStroke();
        rect(b.left, b.top, b.w, b.h, min(radius, b.w / 2, b.h / 2));
    }

    // Glow outline shown around focused / dragged elements. t fades it in and out
    drawFocusRing(b, t, radius = this.cornerRadius) {
        if (t < 0.01) return;
        const grow = 2;
        noFill();
        stroke([...this.strokeStyle.secondaryColor.slice(0, 3), 70 * t]);
        strokeWeight(4);
        rect(b.left - grow, b.top - grow, b.w + grow * 2, b.h + grow * 2, min(radius, b.h / 2) + grow);
    }

    // Apply this element's text style
    applyTextStyle(color = this.textStyle.primaryColor) {
        noStroke();
        fill(color);
        textFont(this.textStyle.fontName);
        textSize(this.textStyle.fontSize);
    }

    // Single line of text, vertically centered on y
    drawLabel(txt, x, y, color = this.textStyle.primaryColor, alignX = CENTER) {
        this.applyTextStyle(color);
        textAlign(alignX, CENTER);
        text(txt, x, y);
    }
}

// Queue presses / releases of the main mouse button (or a touch) for the next frame
window.addEventListener('pointerdown', (event) => {
    if (event.button === 0) UIElement._pendingPress = true;
});
for (const type of ['pointerup', 'pointercancel']) {
    window.addEventListener(type, (event) => {
        if (type === 'pointercancel' || event.button === 0) UIElement._pendingRelease = true;
    });
}

// Send key presses to whichever element has focus
window.addEventListener('keydown', (event) => {
    const element = UIElement.focused;
    if (!element || element.disabled || event.ctrlKey || event.metaKey || event.altKey) return;
    if (element.onKey(event.key)) event.preventDefault();
});


//! RangeElement class - shared base for elements that show a value between 0 and 1 on a track
class RangeElement extends UIElement {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this._value = 0;

        // style.primaryColor = filled part, style.secondaryColor = filled part while hovered / dragged
        // strokeStyle.primaryColor = the empty track
        this.strokeStyle = new StrokeStyle(UITheme.track, UITheme.accent, 0);
    }

    // Always kept between 0 and 1
    get value() { return this._value; }
    set value(v) { this._value = constrain(v, 0, 1); }

    // Convenience for "3 out of 10" style values
    setProgress(current, total) {
        this.value = total ? current / total : 0;
    }

    // Pill shaped track with the first `fraction` of it filled in
    drawTrack(b, fraction, fillColor) {
        const radius = b.h / 2;
        this.drawBox(b, this.strokeStyle.primaryColor, null, 0, radius);
        if (fraction <= 0) return;

        // Clip to the pill so the fill keeps rounded ends at any width
        drawingContext.save();
        drawingContext.beginPath();
        drawingContext.roundRect(b.left, b.top, b.w, b.h, radius);
        drawingContext.clip();
        noStroke();
        fill(fillColor);
        rect(b.left, b.top, b.w * fraction, b.h, 0, radius, radius, 0);
        drawingContext.restore();
    }
}
