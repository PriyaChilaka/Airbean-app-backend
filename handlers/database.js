
const { request, response } = require('express');
const { nanoid } = require('nanoid');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database.json');
const database = lowdb(adapter);

const moment = require('moment');

function initiateDatabase() {
  database.defaults({ accounts: [], orders: [] },{menu:[]}).write();
}
/** To return a coffee menu*/
function getCoffee() {
    const menu = database.get('menu').value()
    
 }                                                                               //To add account            
function addAccount(body) {
  const account = body;
  console.log('Account Info:', account);

  const usernameExists = database.get('accounts').find({ username: account.username }).value();
  const passwordExists = database.get('accounts').find({ password: account.password }).value();

  let result = false;

  if (!usernameExists && !passwordExists) {
    database.get('accounts').push(account).write();
    result = true;
  }

  return result;
}
//to add order for specific user
function addOrder(body) {
    const order = body
    console.log('Oder Info:', order)
    
    let orderID = Math.floor(Math.random() * 100) + 1;
    let eta = Math.floor(Math.random() * 10) + 2;
    let time = moment().format('H:m');

    if (database.get('orders').find({ orderID: orderID }).value()) {
        orderID = Math.floor(Math.random() * 100) + 1;
    }

    database.get('orders').push({ orderID: orderID, menuID: order.menuID, userID: order.userID, eta: eta, time: time }).write();

    return `Order Added. ID: ${orderID} ETA: ${eta} min`;
 
}
//To see order history
function getOrder(ID) {
    const userId = parseInt(ID);
    console.log('Order Details:',userId)
    const orderHistory = database.get('orders').filter({ userId: userId }).value()
    console.log('userId:', userId);
    console.log('orderHistory:', orderHistory);
     return orderHistory;
    
}

exports.initiateDatabase = initiateDatabase;
exports.addAccount = addAccount;
exports.addOrder = addOrder;
exports.getOrder = getOrder;
