class StringStack {
    #values;

    constructor(values) {
        this.#values = values
    }

    push(val) {
        if (typeof val == "string")
			this.#values.push(val);
    }

    pop() {
        return this.#values.pop();
    }
}

