  
const { Router } = require('express');
const router = new Router();

const menu = require('../menu.json');
const { addAccount, addOrder, getOrder } = require('../handlers/database');
//Router for get coffee
router.get('/coffee', (request, response) => {
  response.send(menu);
});
//Router for addAccount
router.post('/account', (request, response) => {
  response.json(addAccount(request.body));
});
//Router for addOrder
router.post('/order', (request, response) => {
  response.json(addOrder(request.body));
});
//Router for orderHistory
router.get('/order/:id', (request, response) => {
  response.json(getOrder(request.params.id));
});

module.exports = router;