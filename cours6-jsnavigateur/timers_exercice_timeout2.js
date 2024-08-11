// Autre solution à l'activité en classe
// Utilisation de fermetures imbriquées pour préserver l'état

// Besoin de fermetures imbriquées pour préserver l'état

// "Préprogrammer" les invocations de setTimeout

var invokeTimes = function(func, noTimes, time) {
	console.log("Invocation: " + noTimes + " " + time);

	var timeoutHandler = function(count) {
		console.log( "invocation " + count);
		func(count);
	}

	for (var i = 0; i < noTimes; ++i) {
		setTimeout(timeoutHandler, time * i, i);
	}
};

var setup = function() {
	invokeTimes( function(i) { alert("hello " + i); }, 5, 1000 );
}

setup();