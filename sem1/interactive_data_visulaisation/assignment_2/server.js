const express = require('express')
const app = express()
const path = require("path")
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/frontend/index.html')))
// app.get('/worldjson.topojson', (req, res) => res.json(path.join(__dirname+'/world.topojson')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))