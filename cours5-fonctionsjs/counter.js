// Fermetures

// Fonction Adder pour exemplifier les fermetures
function Adder(val) {
    let value = val;
    return function(inc) {
		value = value + inc;
	return value;
    }
};

var f = Adder(5);
console.log( f(3) );
console.log( f(5) );

var f2 = Adder(100);
console.log( f2(2) );
console.log( f2(3) );

console.log( f(1) );

// Fermeture Counter qui retourne un objet
function Counter(initial) {
    let val = initial;
    return {	
		increment : function() { val += 1; },
		reset: function() { val = initial; },
		get: function() { return val; }
    };
};

var f = Counter(5), g = Counter(10);
f.increment();
g.increment();
f.reset();
f.increment();
g.increment();
console.log( f.get() + "," + g.get() );

// Fermeture qui maintient un pointeur vers la fonction englobante
// Attention: cet exemple ne montre pas une bonne utilisation de
// la sauvegarde du pointeur "this" (dans la variable "that").
// De plus, l'utilisation de this et that est erronée ici.
// (Cet exemple n'est plus montré explicitement dans le cours, mais
// il est tout de même pertinent [E2023])
function MultiCounter(initial) {
    var that = this;
    var val = [];	
    console.log(this);
    this.init = function() {
	val = [];
	for (var i=0; i<initial.length; i++) {
	    val.push(  initial[i] );
	};
    };
    this.init();
    return {
		increment: function(i) { val[i] += 1; },
		resetAll: function() { that.init(); },
		getValues: function() { return val; }
    };
};

// Version améliorée qui utilise le this/that correctement
// pour stocker une référence vers le "this" de l'objet externe
// (Cet exemple n'est plus montré explicitement dans le cours, mais
// il est tout de même pertinent [E2023])
var MultiCounter2 = {

    create: function(initial) {
	
	var that = this;
	var val = [];	
	console.log(this);
	this.init = function() {
	    val = [];
	    for (var i=0; i<initial.length; i++) {
			val.push(  initial[i] );
	    };
	};
	this.init();
	return {
	    increment: function(i) { val[i] += 1; },
	    resetAll: function() { that.init(); },
	    getValues: function() { return val; }
	};
	
    }
};

var m = MultiCounter( [1, 2, 3] );
//m = MultiCounter2.create( [1, 2, 3] );
m.increment(0);
m.increment(2);
m.increment(0);
m.resetAll();
m.increment(1);
console.log( m );
console.log( m.getValues() );

// Cet exemple est erroné!
// (Cet exemple n'est plus montré explicitement dans le cours, mais
// il est tout de même pertinent [E2023])
function MakeCounters2(n) {
    var counters = [];
    for (var i=0; i<n; i++) {
	var val = i;
	counters[i] = {
	    increment: function() { val++; },
 	    get: function() { return val; },
	    reset: function() { val = i; }
	}
    }
    return counters;
};

// Cet exemple résoud le problème, mais ajoute des champs additionels à l'objet compteur
// (Cet exemple n'est plus montré explicitement dans le cours, mais
// il est tout de même pertinent [E2023])
function MakeCounters1(n) {
    var counters = [];
    for (var i=0; i<n; i++) {
	counters[i] = {
	    val : i,
	    initial : i,
	    increment: function() { this.val++; },
 	    get: function() { return this.val; },
	    reset: function() { this.val = this.initial; }
	}
    }
    return counters;
};

// Cet exemple montre l'utilisation d'une IIFE (Immediately Invoked Function Expression)
// Il corrige également le problème de MakeCounters1 ci-haut (en évitant d'introduire des
// champs supplémentaires)
var CreateCounters = function(n) {
	let counters = [];
	for (let i=0; i<n; i++) {
		counters[i] = function( ) {
			let initial = i, val = initial;
			return {	
				increment: function() { val++; },
				get: function() { return val; },
				reset: function() { val = initial; }
			}
		}(); // IIFE: Immediately Executed Function Expression
	}
	return counters;
} 
// Créé 10 compteurs, dont la valeur initiale est i
let m = CreateCounters(10);
for (let i=0; i<10; i++) {
	console.log("Counter[ " + i + "] = " + m[i].get());
}

// Exemple de référencement du contexte parent
// Cet exemple ne fonctionne pas, puisque dans l'appel à setInterval, le contexte
// "this" ne pointera pas sur l'objet Timer (il pointera sur le contexte global
// "window" en raison de la fonction du timer qui est asynchrone)
function Timer( initial ) {
	// On assume que initial est un entier
	this.initial = initial
	this.val = initial * 1000
};
Timer.prototype.start = function() {
	this.interval = setInterval( function() {
		this.val -= 1
		if (this.val <= 0) {
			this.stop()
		}
		console.log(this.val);
	}, 1000);
}
Timer.prototype.stop = function() {
	clearInterval(this.interval)
}
Timer.prototype.reset = function() {
	this.val = this.initial
}

var t = new Timer(10)
t.start()

// Dans cette version, la fonction Timer est corrigée: le contexte global 'this' est
// sauvegardé dans une variable 'that'
function Timer( initial ) {
	// On assume que initial est un entier
	this.initial = initial
	this.val = initial
};
Timer.prototype.start = function() {
	let that = this;
	this.interval = setInterval( function() {
		that.val -= 1
		if (that.val <= 0) {
			that.stop()
		}
		console.log(that.val);
	}, 1000);
}
Timer.prototype.stop = function() {
	clearInterval(this.interval)
}
Timer.prototype.reset = function() {
	this.val = this.initial
}

let t = new Timer(10)
t.start()

// Dans cette troisième version, nous transformons Timer en une fonction
// qui utilise les propriétés des fermetures afin de retourner un objet.
// Cet objet expose les méthodes publiques qui pourront être invoquées;
// les variables privées sont correctement encapsulées.
// Note: l'appel à this.stop échouera pour la même raison que mentionnée
// précédemment: this pointera sur le contexte global (en raison de la 
// fonction anonyme gestionnaire du timer). Ce n'est pas évident à visualiser.
function Timer(initial) {
    let val = initial;
    let interval = null;

    return {
        start: function() {
            interval = setInterval( function() {
                val -= 1;
                if (val <= 0) {
                    //console.log(this);
                    // this.stop(); // Ne fonctionnera pas
					clearInterval(interval);
                }
                console.log(val);
            }, 1000);
        },
        stop: function() {
            console.log(interval)
            clearInterval(interval);
        },
        reset: function() {
            val = initial;
        },
        getValue: function() {
            return val;
        }
    }
}

let t = new Timer(10)
t.start()

// Si l'on souhaite quand même invoquer la méthode 'stop' (par exemple,
// pour éviter d'avoir à dupliquer son code), on doit sauvegarder le
// contexte 'this'.
function Timer(initial) {
    let val = initial;
    let interval = null;
	let that = null;

    return {
        start: function() {
			that = this; // Sauvegarder le this hors de la fonction anonyme
            interval = setInterval( function() {
                val -= 1;
                if (val <= 0) {
                    that.stop(); // Ne fonctionnera pas
                }
                console.log(val);
            }, 1000);
        },
        stop: function() {
            console.log(interval)
            clearInterval(interval);
        },
        reset: function() {
            val = initial;
        },
        getValue: function() {
            return val;
        }
    }
}

let t = new Timer(10)
t.start()
//t.stop();
t.getValue();
//t.val : ne fonctionnera plus

// Fonctions d'ordre supérieur

// Exemple d'une fonction d'ordre supérieur
var map = function( array, fn ) {
    // Applique fn à chaque élément de la liste, retourne une nouvelle liste
    var result = [];
    for (var i = 0; i < array.length; i++) {
	var element = array[i];
	var args = [ element ];
	result.push( fn.apply(null, args) );
    }
    return result;
};

var l = [3, 1, 5, 7, 2];
console.log( map(l, function(num) { return num + 10; }) );

var add = function(a, b) {
    return a + b;
};

// Exemple de curryfication
var add10 = add.bind(null, 10); 
console.log( map(l, add10) )

// Solution à l'activité en classe pour la fonction filter
// Solution to the class activity for the filter function is below;
var filter = function( array, fn ) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        var args = [ element ];
        if (fn.apply(null, args) ) result.push(element); 
        //if (fn(element) ) result.push(element); 
    }
    return result;
};

var divisibleBy = function(d, x) { return (Number.isInteger(x/d)) }; 
var isPair = divisibleBy.bind(null, 2);

var a = [ 1, 3, 10, 8, 2, 7, 6 ];
var c = filter( a, isPair);
console.log(c);

// Autre exemple
var lesserThan = function(a, b) { return (a < b) ? true:false; } 
var greaterThan5 = lesserThan.bind(null, 5);
var c = filter( a, greaterThan5);
console.log(c);
