const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
var cors = require('cors')

const todos = require('./routes/todoRoutes')

app.use(morgan('dev'))
app.use(bodyParser.json({limit: "5mb"}))
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}))
app.use(cors())

app.use('/api', todos)

const port = 8000
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})