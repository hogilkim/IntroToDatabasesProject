const express = require("express");
const routes = express.Router();
const CustomerController = require('./controllers/CustomerController');
const AirlineStaffController = require('./controllers/AirlineStaffController');


routes.get('/status', (req, res)=>{
    res.send({stats: 200});
})

routes.post('/user/customer/register', CustomerController.createCustomer);
routes.get('/user/:customerID', CustomerController.getCustomerById);

//AirlineStaffController
routes.post('/airport/new', AirlineStaffController.createAirport);
routes.post('/airline/new', AirlineStaffController.createAirline);
routes.post('/airplane/new', AirlineStaffController.createAirplane);
routes.post('/flight/new', AirlineStaffController.createFlight);

module.exports = routes;
