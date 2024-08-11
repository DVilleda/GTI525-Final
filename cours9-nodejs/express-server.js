const express = require('express')
const app = express()
const port = 3000

const staticPath = "static/";

const serveStatic = (req, res) => {
    res.sendFile(req.url, {root: staticPath})
}

app.get('/', (req, res) => res.send("Hello World!"))

// Static assets
app.get('/*.html', serveStatic)
app.get('/*.js', serveStatic)

// Hello message
app.get('/hello-:id', (req, res) => setTimeout( () => res.send("world-" + req.params["id"]), 3000 ) )

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Pour exécuter localement: node app.js
// Si Express n'est pas installé, vous pouvez exécuter npm install express au préalable
