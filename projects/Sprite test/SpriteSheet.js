//! Class Spritesheet
class SpriteSheet {
    constructor(filepath, width, height, rows, columns) {
        this.filepath = filepath;
        this.width = width;
        this.height = height;
        this.rows = rows;
        this.columns = columns;

        // sprite details
        this.spriteWidth = this.width / this.columns;
        this.spriteHeight = this.height / this.rows;
    }

}

class Sprite {
    constructor(spriteSheet, row, column) {
        this.spriteSheet = spriteSheet;
        this.row = row;
        this.column = column;
    }


    // Render the sprite with a given width and height
    render(x, y, width, height) {

    }
}


