
const { request } = require('express');
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
 }                                                                                           
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

function addOrder(body) {
    const order = body
    console.log('Oder Info:',order)
    
  let orderID = Math.floor(Math.random() * 100) + 1;
  let eta = Math.floor(Math.random() * 10) + 2;
  

  if (database.get('orders').find({ orderID: orderID }).value()) {
    orderID = Math.floor(Math.random() * 100) + 1;
  }

  database.get('orders').push({ orderID: orderID, menuID: order.menuID, userID: order.userID, eta: eta }).write();

  return `Order Added. ID: ${orderID} ETA: ${eta} min`;
 
}

function getOrder(ID) {
    const userID = parseInt(ID);
    console.log('Order Details:',userID)
    const orderHistory = database.get('orders').filter({ userID: userID }).value()
    console.log( orderHistory)
    const result = {
    success: false,
    orderHistory: false,
  };

  if (orderHistory.length > 0) {
    result.success = true;
    result.orderHistory = orderHistory;
  } else {
    result.success = false;
    result.message = "You haven't placed an order yet";
  }

  res.json(result);
    
}

exports.initiateDatabase = initiateDatabase;
exports.addAccount = addAccount;
exports.addOrder = addOrder;
exports.getOrder = getOrder;
