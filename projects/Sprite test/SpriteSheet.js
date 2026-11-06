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

}


