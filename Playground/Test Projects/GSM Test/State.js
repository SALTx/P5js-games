//! class State
class State {
    constructor(name, init, update, exit) {
        this.name = name;       // The name of the state
        this.init = init;       // Function that is executed once when the state is loaded
        this.update = update;   // Function that is executed at every frame of the draw function while the state is active
        this.exit = exit;       // Function that is executed once when the state terminates and moves to another state
    }
}
