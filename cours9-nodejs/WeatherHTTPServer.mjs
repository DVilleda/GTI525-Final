import http from "http"
import fs from "fs"
import { EventEmitter } from "events"
import WeatherWatcher from './WeatherWatcher_solution.mjs'

// Éléments statiques
const path="static/";

// Créer un nouvel EventEmitter
const emitter = new EventEmitter()

// Données météo les plus récentes
let latestWeather = {}

function monitorWeather() {
    // Cities
    const cities = [
        {name: "Montreal", latitude: "45.50589", longitude: "-73.63486", interval: 1000},
        {name: "Quebec", latitude: "46.8123", longitude: "-71.2145", interval: 1800},
        {name: "Toronto", latitude: "43.7001", longitude: "-79.4163", interval: 2200},
    ]
    
    // Surveiller la météo aux villes demandées
    const watcher = new WeatherWatcher(emitter, cities)
    watcher.start()
    
    cities.forEach( (city) => {
        emitter.on(city.name, (data) => {
            latestWeather[city.name] = data
        })
    })
}

// Démarrage le monitoring de la météo
monitorWeather()

var serveRequest = function(request, response) {
    // TODO: complétez votre code ici
};


// Démarre le serveur sur le port demandé et configure la réponse
var port = 8080;
var server = http.createServer(serveRequest);
server.listen(port);
console.log("Démarrage du serveur sur le port: " + port);
