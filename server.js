const lowdb = require('lowdb')
const cors = require('cors')
const express = require('express')

const coffeeRouter = require('./routes/index')
const { initiateDatabase } = require('./handlers/database')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/', coffeeRouter)

app.listen(8000, () => {
  console.log('Server started')
  initiateDatabase()
});