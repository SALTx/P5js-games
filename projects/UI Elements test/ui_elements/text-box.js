//! class TextBox

class TextBox {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // default values that dont have to be defined
        this.selected = false;
    }

    // Static values
    static selectedTextBox = null; // pointer to currently active text box

    // Static function to draw all textboxes in an array and other static functions to be defined later

    // Helper function to select this textbox
    select() {
        // Change the static selected text box to this one
        TextBox.selectedTextBox = this;
    }

    render() {
        // Render function to draw the text box
    
        // Sets the selected value for this text box
        this.selected = (TextBox.selectedTextBox == this);
    }

}