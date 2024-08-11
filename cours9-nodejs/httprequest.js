// Exemple d'un serveur HTTP simple écrit avec Node.JS
// Source: node.js succinctly

var http = require('http');
if (! http) throw { msg: "Cannot find http" };

// Fonction simple pour servir une requête
var serveRequest = function(request, response) {
	console.log("Calling serveRequest : " + request.url );
	request.on("end", function() {
		console.log("Request ended");
		response.write("Ok");
		response.end();
	});
};

// Start the server on the port and setup response
var port = 8080;
var server = http.createServer(serveRequest);
server.listen(port);
