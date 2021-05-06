const lowdb = require('lowdb');

const express = require('express');

const FileSync = require('lowdb/adapters/FileSync')

const coffeeRouter = require('./routes/index')
const { initiateDatabase } = require('./handlers/database')

const adapter = new FileSync('accounts.json')

const database = lowdb(adapter)

const app = express()

//function initiateDatabase() {
 // database.defaults({ accounts: [] }).write()
//
app.use(express.json());
app.use('/api/', coffeeRouter);

app.listen(8000, () => {
  console.log('Server started');
  initiateDatabase();
});