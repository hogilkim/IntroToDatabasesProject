const express = require("express");
const routes = express.Router();
const CustomerController = require('./controllers/CustomerController');


routes.get('/status', (req, res)=>{
    res.send({stats: 200});
})

routes.post('/user/customer/register', CustomerController.createCustomer);
routes.get('/user/:customerID', CustomerController.getCustomerById);

module.exports = routes;