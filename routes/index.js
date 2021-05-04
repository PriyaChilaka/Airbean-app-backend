  
const { Router } = require('express');
const router = new Router();

const menu = require('../menu.json');
const { addAccount, addOrder, getOrder } = require('../handlers/database');

router.get('/coffee', (request, response) => {
  response.send(menu);
});

router.post('/account', (request, response) => {
  response.json(addAccount(request.body));
});

router.post('/order', (request, response) => {
  response.json(addOrder(request.body));
});

router.get('/order/:id', (request, response) => {
  response.json(getOrder(request.params.id));
});

module.exports = router;