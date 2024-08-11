class Timer {
    // Déclaration obligatoire des propriétés privées
    #initial;
    #val;
    #interval;
    
    constructor(initial) {
        this.#initial = initial
        this.#val = initial
    }

    start() {
        const that = this
        this.#interval = setInterval( function() {
            that.#val -= 1;
            if (that.#val <= 0) {
                that.stop(); // Ne fonctionnera pas
            }
            console.log(that.#val);
        }, 1000);
    }

    stop() {
        clearInterval(this.#interval)
    }

    reset() {
        this.#val = this.#initial
    }
    
    getValue() {
        return this.#val
    }
}
