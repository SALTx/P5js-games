// Styles for UI elements
// note for this to improve performance and scalability similar to the C version I wrote for alpha engine

class UIStyle {
    constructor(primaryColor, secondaryColor) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }
}

class TextStyle {
    contsructor(primaryColor, secondaryColor, fontName, fontSize) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.fontName = fontName;
        this.fontSize = fontSize;
    }
}


// Global defaults
let defaultUIStyle;
let defaultTextStyle;

function initializeDefaults() {
    defaultUIStyle = new UIStyle(color(255, 0, 0), color(0, 255, 0));
    defaultTextStyle = new TextStyle(color(0, 0, 0), color(255, 255, 255), 'Arial', 24);
}
