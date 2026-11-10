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
    static addSpriteSheet(spriteSheetName, spriteSheet) {
        // Iterate over the array and check if the sprite is there
        SpriteSheet.SpriteSheets.forEach((spriteSheet) => {
            if(spriteSheet.name === spriteSheetName) {
                console.log("[SpriteSheet]: Attempting to add a sprite sheet that already exists");
                return spriteSheet.spriteSheet; // TODO: find a way to return the new sheet when it gets added to the container
            } else {
                // for debugging only
                console.log(`[SpriteSheet]: Iterating through container (${spriteSheetName})`);
            }
        });

        // If the sprite doesnt exist then add ot
        SpriteSheet.SpriteSheets.push({
            name: spriteSheetName,
            spriteSheet: spriteSheet,
        })
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
