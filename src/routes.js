const express = require("express");
const routes = express.Router();
const CustomerController = require('./controllers/CustomerController');
const AirlineStaffController = require('./controllers/AirlineStaffController');
const WebServiceController = require('./controllers/WebServiceController');
const BookingAgentController = require('./controllers/AgentController');
const LoginController = require('./controllers/LoginController');

routes.get('/status', (req, res)=>{
    res.send({stats: 200});
})

//LoginController
routes.get('/user/customer/login', LoginController.customerLogin);

//CustomerController
routes.post('/user/customer/register', CustomerController.createCustomer);
routes.get('/user/:customerID', CustomerController.getCustomerById);
routes.get('/ticket/:ticketID', CustomerController.getCustomerTicketById);

//AirlineStaffController
routes.post('/airport/new', AirlineStaffController.createAirport);
routes.post('/airline/new', AirlineStaffController.createAirline);
routes.post('/airplane/new', AirlineStaffController.createAirplane);
routes.post('/flight/new', AirlineStaffController.createFlight);
routes.post('/staff/new', AirlineStaffController.createStaff);
routes.delete('/flight/:flightID',AirlineStaffController.deleteFlight);

//WebServiceController
routes.post('/agent/new', BookingAgentController.createBookingAgent);
routes.post('/ticket/new/:customer_ID', WebServiceController.createTicket);
routes.post('/transaction/new', WebServiceController.createTransaction);
routes.post('/rating/new', WebServiceController.createRate);
routes.get('/flights', WebServiceController.getAllFlights);
routes.get('/ticket/get/:ticket_id', WebServiceController.getTicket);



module.exports = routes;
