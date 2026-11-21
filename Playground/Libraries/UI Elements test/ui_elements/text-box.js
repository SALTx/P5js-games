// class TextBox
// REQUIRES: ui-styles.js, ui-element.js

//! TextBox class
// Click to focus, type to edit. Enter calls onSubmit(txt), Escape or clicking elsewhere removes focus
// textStyle.primaryColor = typed text, textStyle.secondaryColor = placeholder text
class TextBox extends UIElement {
    constructor(x, y, width, height, txt = '') {
        super(x, y, width, height);
        this.txt = txt;
        this.placeholder = 'Type here...';
        this.maxLength = 200;
        this.padding = 10;
        this.onChange = () => {};
        this.onSubmit = () => {};

        this.focusable = true;
        this.cursorType = TEXT;
        this.style = new UIStyle(UITheme.surface, UITheme.surface);
        this._lastEdit = 0; // keeps the caret solid right after typing
    }

    // Old name for `placeholder`
    get previewTxt() { return this.placeholder; }
    set previewTxt(v) { this.placeholder = v; }

    select() {
        UIElement.setFocus(this);
    }

    onFocus() {
        this._lastEdit = millis();
    }

    onKey(key) {
        const before = this.txt;

        if (key === 'Backspace') this.txt = this.txt.slice(0, -1);
        else if (key === 'Enter') this.onSubmit(this.txt);
        else if (key === 'Escape') UIElement.setFocus(null);
        else if (key.length === 1) {
            if (this.txt.length < this.maxLength) this.txt += key;
        } else return false; // arrows, tab, etc. are left alone

        this._lastEdit = millis();
        if (this.txt !== before) this.onChange(this.txt);
        return true;
    }

    // Trim the text until it fits. While typing the end stays visible, otherwise the start does
    fitText(txt, maxWidth, keepEnd) {
        while (txt.length > 0 && textWidth(txt) > maxWidth) {
            txt = keepEnd ? txt.slice(1) : txt.slice(0, -1);
        }
        return txt;
    }

    draw(b) {
        this.drawFocusRing(b, this.focusT);

        const outline = UIElement.mix(
            this.strokeStyle.primaryColor, this.strokeStyle.secondaryColor,
            max(this.focusT, this.hoverT * 0.5)
        );
        this.drawBox(b, this.style.primaryColor, outline, this.strokeStyle.weight);

        const textX = b.left + this.padding;
        const midY = b.top + b.h / 2;
        const maxWidth = b.w - this.padding * 2;

        this.applyTextStyle();
        textAlign(LEFT, CENTER);

        let shown = '';
        if (this.txt) {
            shown = this.fitText(this.txt, maxWidth, this.isFocused);
            text(shown, textX, midY);
        } else if (!this.isFocused) {
            fill(this.textStyle.secondaryColor);
            text(this.fitText(this.placeholder, maxWidth, false), textX, midY);
        }

        // Blinking caret
        if (this.isFocused && (millis() - this._lastEdit) % 1000 < 500) {
            const caretX = textX + textWidth(shown) + 1;
            const half = this.textStyle.fontSize * 0.6;
            stroke(this.textStyle.primaryColor);
            strokeWeight(1.5);
            line(caretX, midY - half, caretX, midY + half);
        }
    }
}
