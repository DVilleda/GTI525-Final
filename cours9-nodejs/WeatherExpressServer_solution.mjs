import express from "express"
import fs from "fs"
import { EventEmitter } from "events"
import WeatherWatcher from './WeatherWatcher_solution.mjs'

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

const app = express()
const port = 3000

const staticPath = "static/";

const serveStatic = (req, res) => {
    res.sendFile(req.url, {root: staticPath})
}

// Static assets
app.get('/*.html', serveStatic)
app.get('/*.js', serveStatic)
app.get('/*.jpg', serveStatic)
app.get('/*.png', serveStatic)

// Default page
app.get('/', (req, res) => {
    serveStatic( {url: "meteo.html"}, res )
})

// weather-xyz
app.get('/weather/:city', (req, res) => {

    let city = req.params["city"]

    console.log( "Ville: " + city );

    // Obtenir la météo
    let weather = latestWeather[city]
    
    if (weather) {
        // Retourner en JSON
        res.send( weather )
	
    } else {
        // Retourner 400 Bad Request
        weather.sendStatus(400)
        
    }
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
