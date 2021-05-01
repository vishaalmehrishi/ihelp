var express = require('express')
var cors = require('cors')
var morgan = require('morgan')
var getDistance = require('./mapRequest')

var app = express()
var port = 3001

app.use(cors())
app.use(morgan('combined'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/maps/:origin/:destination', (req, res) => {
    getDistance(req.params.origin, req.params.destination)
    .then(data => {
        res.send(data.toString())
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})