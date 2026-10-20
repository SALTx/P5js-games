// Styles for UI elements
// note for this to improve performance and scalability similar to the C version I wrote for alpha engine

class UIStyle {
    constructor(primaryColor, secondaryColor) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }
}

class StrokeStyle {
    constructor(primaryColor, secondaryColor, weight) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.weight = weight;
    }
}

class TextStyle {
    constructor(primaryColor, secondaryColor, fontName, fontSize) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.fontName = fontName;
        this.fontSize = fontSize;
    }
}
