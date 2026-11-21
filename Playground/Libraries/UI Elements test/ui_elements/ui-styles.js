// Styles for UI elements
// Colors are plain [r, g, b] (or [r, g, b, a]) arrays so they are cheap to store and blend

//! Base style: a pair of colors. What each one means is up to the element using it
class UIStyle {
    constructor(primaryColor, secondaryColor) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }
}

//! Stroke style: a color pair plus a weight in px
class StrokeStyle extends UIStyle {
    constructor(primaryColor, secondaryColor, weight) {
        super(primaryColor, secondaryColor);
        this.weight = weight;
    }
}

//! Text style: a color pair plus font settings
class TextStyle extends UIStyle {
    constructor(primaryColor, secondaryColor, fontName, fontSize) {
        super(primaryColor, secondaryColor);
        this.fontName = fontName;
        this.fontSize = fontSize;
    }
}

//! The shared palette every element builds its default styles from
// Change a value here (before creating elements) to restyle the whole library
const UITheme = {
    accent:      [37, 99, 235],     // main interactive color
    accentHover: [29, 78, 216],     // accent when hovered / dragged
    onAccent:    [255, 255, 255],   // text and icons drawn on top of the accent
    surface:     [255, 255, 255],   // input backgrounds, slider knob
    track:       [226, 232, 240],   // empty part of sliders / progress bars
    border:      [203, 213, 225],   // resting outlines
    text:        [15, 23, 42],      // normal text
    muted:       [148, 163, 184],   // placeholder / secondary text
    shadow:      [15, 23, 42],      // drop shadow tint

    font: 'Arial',
    fontSize: 16,
    radius: 8,                      // default corner radius in px
};
