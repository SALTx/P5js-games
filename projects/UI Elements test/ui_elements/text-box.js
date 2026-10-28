//! class TextBox

class TextBox {
    constructor(x, y, width, height, txt) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // text components
        this.txt = txt;
        this.previewTxt = "Bungo Screebis infan secur lop";

        // default values that dont have to be defined
        this.selected = false;

    }

    // Static values
    static selectedTextBox = null; // pointer to currently active text box

    // Static function to draw all textboxes in an array and other static functions to be defined later

    // Helper function to 
    isHover() {
        let xOverlap = mouseX > this.x && mouseX < (this.x + this.width);
        let yOverlap = mouseY > this.y && mouseY < (this.y + this.height);

        return (xOverlap && yOverlap);
    }

    // Helper function to select this textbox
    select() {
        // Change the static selected text box to this one
        TextBox.selectedTextBox = this;
    }

    render() {
        // Render function to draw the text box

        // Coerce text rendering to TOP LEFT
        textAlign(LEFT, TOP);

        // Draw the text box
        fill(255, 255, 255);
        noStroke();
        rect(this.x, this.y, this.width, this.height);

        // Check if there is text, otherwise render preview text
        if(!this.txt) {
            // There is no text stored in the text box
            fill(255, 0, 0);
            text(this.previewTxt, this.x, this.y);
        }
    }

}