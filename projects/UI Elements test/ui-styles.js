// Styles for UI elements
// note for this to improve performance and scalability similar to the C version I wrote for alpha engine

class UIStyle {
    constructor(primaryColor, secondaryColor) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }
}

class TextStyle {
    contsructor(primaryColor, secondaryColor, fontSize) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.fontSize = fontSize;
    }
}