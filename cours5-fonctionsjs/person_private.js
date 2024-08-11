class Person {
    // Propriétés privées
    #firstName;
    #lastName;
    #pronoun;
    #age;

    // Constructeur
    constructor(firstName, lastName, pronoun, age) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#pronoun = pronoun;
        this.#age = age;
    }

    // Méthodes publiques getters-setters.
    // Les setters effectuent de la validation en invoquant des méthodes privées.
    getFirstName() {
        return this.#firstName
    }

    setFirstName(firstName) {
        this.#firstName = firstName
        if (this.#validateNameField(firstName)) {
            this.#firstName = firstName;
        } else {
            console.error('Invalid first name');
        }
    }

    getLastName() {
        return this.#lastName
    }

    setLastName(lastName) {
        this.#lastName = lastName
        if (this.#validateNameField(lastName)) {
            this.#lastName = lastName;
        } else {
            console.error('Invalid last name');
        }
    }

    getPronoun() {
        return this.#pronoun
    }

    setPronoun(pronoun) {
        this.#pronoun = pronoun
        if (this.#validateNameField(pronoun)) {
            this.#pronoun = pronoun;
        } else {
            console.error('Invalid pronoun');
        }
    }

    getAge() {
        return this.#age;
    }

    setAge(age) {
        if (this.#validateAge(age)) {
            this.#age = age;
        } else {
            console.error('Invalid age');
        }
    }

    // Validation des champs en lien avec le nom (méthode privée)
    #validateNameField(name) {
        return typeof name === 'string' && name.length > 0;
    }

    // Validation de l'âge (méthode privée)
    #validateAge(age) {
        return typeof age === 'number' && age > 0;
    }
}