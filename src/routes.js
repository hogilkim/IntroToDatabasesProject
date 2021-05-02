const express = require("express");
const routes = express.Router();
const CustomerController = require('./controllers/CustomerController');
const AirlineStaffController = require('./controllers/AirlineStaffController');
const WebServiceController = require('./controllers/WebServiceController');

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
routes.post('/staff/new', AirlineStaffController.createStaff);

//WebServiceController
routes.post('/agent/new', WebServiceController.createBookingAgent);
routes.post('/ticket/new', WebServiceController.createTicket);
routes.post('/transaction/new', WebServiceController.createTransaction);
routes.post('/rating/new', WebServiceController.createRate);


module.exports = routes;
