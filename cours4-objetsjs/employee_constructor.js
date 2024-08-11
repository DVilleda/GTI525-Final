/*
Exemple de code démontrant l'héritage prototypal au moyen des fonctions constructeur (Person et Employee).

Se référer aux notions théoriques décrites dans les acétates du cours.
*/
const Person = function(firstName, lastName, pronoun) {
	this.firstName = firstName;	
	this.lastName = lastName;
	this.pronoun = pronoun;
	this.name = function() { // ajout d'une méthode via le constructeur
		return this.firstName + " " + this.lastName;
	}
}

let p1 = new Person("John", "Smith", "He");
console.log( p1.firstName );
console.log( p1["lastName"] );
console.log( p1.name() );

Person.prototype.print = function() { // ajout d'une méthode via le prototype
	console.log( this.name() + " " + this.pronoun );
}

console.log(p1);
console.log(Person.prototype);
let proto1 = Object.getPrototypeOf(p1);
console.log(proto1);
console.log(Object.getPrototypeOf(proto1));
console.log(Object.getPrototypeOf(Person));

let p2 = new Person("Linda", "James", "She");
console.log(p2);
let proto2 = Object.getPrototypeOf(p2);
console.log(proto2);

p1.print();
p2.print();

const Employee = function(firstName, lastName, pronoun, title) {
	Person.call(this, firstName, lastName, pronoun);
	this.title = title;	
};

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.print = function() {
	console.log( this.name() + " " + this.pronoun + " " + this.title );
}

let e1 = new Employee("XYZ", "ABC", "He", "Manager");
console.log( Employee.prototype );
console.log( Object.getPrototypeOf(e1) );

// Imprime
e1.print();
p1.print();
p2.print();

// Employee.prototype = Object.prototype;

// Vérifie les instances et les prototypes
console.log(e1 instanceof Employee);
console.log(e1 instanceof Person);
console.log(e1 instanceof Object);

console.log(p1 instanceof Employee);
console.log(p1 instanceof Person);
console.log(p1 instanceof Object);

console.log(p2 instanceof Employee);
console.log(p2 instanceof Person);
console.log(p2 instanceof Object);

console.log( "firstName" in p1 );
console.log( "lastName" in p1 );
console.log( "title" in p1 );

console.log( "firstName" in e1 );
console.log( "lastName" in e1 );
console.log( "title" in e1 );

console.log( p1.hasOwnProperty("firstName") );
console.log( p1.hasOwnProperty("lastName") );
console.log( p1.hasOwnProperty("print") );
console.log( e1.hasOwnProperty("firstName") );
console.log( e1.hasOwnProperty("lastName") );
console.log( e1.hasOwnProperty("print") );
