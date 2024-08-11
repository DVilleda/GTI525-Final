// Solution à l'activité en classe

var setColor = function(color) {
	return function(e) {
		if (e.target.style.backgroundColor == color)
			e.target.style.backgroundColor = null;
		else
			e.target.style.backgroundColor = color;
	}
}

window.onload = function() {
	alert("Le document a fini de charger!");
	var redBtn = document.getElementById("rouge");
	var greenBtn = document.getElementById("vert");
	var blueBtn = document.getElementById("bleu");
	redBtn.addEventListener( "click", setColor("red"), false);
	greenBtn.addEventListener( "click", setColor("green"), false);
	blueBtn.addEventListener( "click", setColor("blue"), false);
}
