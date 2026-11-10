//! Class Spritesheet
class SpriteSheet {
    // TODO: add gutter variable(s) 
    constructor(file, rows, columns) {
        this.file = file; // Holds the image pointer [Type: p5.Image]
        this.rows = rows;
        this.columns = columns;

        // sprite details
        this.spriteWidth = this.file.width / this.columns;
        this.spriteHeight = this.file.height / this.rows;
    }

    // Static containers
    static SpriteSheets = [];

    // Static function to add a spritesheet to the container
    static addSpriteSheet(path, spriteSheetName) {
        // Check if the spriteSheet exists in the SpriteSheet container
        if(SpriteSheet.SpriteSheets.find(spriteSheet => spriteSheet.name === spriteSheetName)) {
            console.log("[SpriteSheet]: Attempting to add a sprite sheet that already exists");
            return;
        } else {
            SpriteSheet.SpriteSheets.push({
                name: spriteSheetName,
                path: path,
            })
        }
    }

    // Member functions
    drawSprite(row, column, x, y, width, height) {
        // Draws the given sprite from the sprite sheet at a provided coordinate with specified width and height
        image(
            this.file,
            x,
            y,
            width,
            height,
            column * this.spriteWidth,
            row * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight
        );
    }

}
