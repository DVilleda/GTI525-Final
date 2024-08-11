const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send("Hello World!"))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// Pour exécuter localement: node app.js
// Si Express n'est pas installé, vous pouvez exécuter npm install express au préalable