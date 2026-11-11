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

    // Static container holding the spritesheets each with a unique name {name, spriteSheet}
    static SpriteSheets = [];

    // A testing container for the animaions of each spriteSheet {name, animation} animation holds an array of row,cols and the length of said array is how many frames it has
    static SpriteSheetAnimations = [];

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

    static addAnimation(spriteSheet, startingSprite, endingSprite) {
        // The animation travels vertically
        if(startingSprite[1] == endingSprite[1]) {

        } else if(startingSprite[0] == endingSprite[0]) {

        } else {
            // The sprite is going diagonally which isnt supported yet
            console.log(`[SpriteSheet]: Attempting to add an animation that happens diagonally through a spritesheet`);
        }
    }

    // static function to retrieve a spriteSheet from the container
    static getSpriteSheet(spriteSheetName) {
        let returnSpriteSheet = null;

        SpriteSheet.SpriteSheets.forEach((spriteSheet) => {
            if(spriteSheet.name === spriteSheetName) {
                console.log("Successfully retrieved spritesheet by name " + spriteSheetName);
                returnSpriteSheet = spriteSheet.spriteSheet;
            }
        })

        return returnSpriteSheet;
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
