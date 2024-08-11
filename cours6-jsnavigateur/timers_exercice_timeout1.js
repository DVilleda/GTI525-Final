// Solution en utilisant setTimeout

var invokeTimes = function(func, noTimes, time) {
	console.log("Invocation: " + noTimes + " " + time);
	var count = 0;
	var timeoutHandler = function() {
		// timeOutHandler est une fermeture
		console.log( "invocation " + count);
		func(count);
		count = count + 1;
		if (count < noTimes) {
			setTimeout(timeoutHandler, time);
		}
	};
	if (count==0) setTimeout(timeoutHandler, time);
};

var setup = function() {
	invokeTimes( function(i) { alert("hello " + i); }, 10, 1000 );
}

setup();