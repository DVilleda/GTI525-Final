// Exemple de setTimeout avec passage de paramètre

var timeoutHandler1 = function(message) {
	alert(message);
};

var ret = setTimeout(timeoutHandler1, 100, "Hello")

// .....

// Exemple de setTimeout avec fonction englobante

var timeoutHandler2 = function(message) {
	alert(message);
};

var ret = setTimeout(function() { timeoutHandler2("Hello") }, 100);

// .....

// Exemple de setTimeout avec fonction fléchée englobante

var timeoutHandler3 = function(message) {
	alert(message);
};

var ret = setTimeout(() => timeoutHandler3("Hello"), 100);

// .....

// Exemple de setTimeout avec fermeture

var timeoutHandler4 = function(message) {
	return function() {
		alert(message);
	}
};

var ret = setTimeout(timeoutHandler4("Hello"), 100)

// .....

// Exemple de setInterval avec fermeture

var intervalHandler = function(message) {
	var i = 0;
	return function() {
		console.log(message + '  ' + i);  
		i += 1;


	}
};
var ret = setInterval(intervalHandler("invocation"), 1000);

setTimeout( () => clearInterval(ret), 5000)