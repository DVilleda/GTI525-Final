// Exemple d'un serveur HTTP simple écrit avec Node.JS (flux)
// Source: node.js succinctly

import http from 'http'

// Fonction simple pour servir une requête
var serveRequest = function(request, response) {
    console.log("Received request " + request);
    response.setHeader("AppId", "GTI525");
    response.writeHead(200, { "Content-type":"text/html"});
    response.write("Received: " + request.url);
    response.end();
};

// Démarre le serveur sur le port demandé et définit un gestionnaire
// "on" qui permet de traiter une requête
// Écoute sur le port spécifié
var port = 8080;
var server = http.createServer();
console.log("Starting server on port " + port);
server.on("request", serveRequest);
// équivalent à: var server = http.createServer(serveRequest);
server.listen(port);
