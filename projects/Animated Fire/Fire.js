//! class Fire

class Fire {
    constructor(x, y, temperature, hue = [255, 0, 0]) {
        this.x = x;
        this.y = y;
        this.temperature = temperature; // a value between 0 and 1;
        this.hue = hue; // defaults to red. the color of the fire
    }

    // Static values;
    static width = 10;
    static height = 10;

    update() {
        // Update logic

        // Coerce temperature value between 0 and 1
        if(this.temperature < 0) this.temperature = 0;
        if(this.temperature > 1) this.temperature = 1;
    }

    render() {
        // fill
        fill(this.hue);
        rect(this.x, this.y, Fire.width, Fire.height);
    }
}
