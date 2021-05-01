const Customer = require('../models/Customer');
const Flight = require('../models/Flight');
const BookingAgent = require('../models/BookingAgent');
const Transaction = require('../models/Transaction');
const Ticket = require('../models/Ticket');
const Rate = require('../models/Rate');

const bcrypt = require('bcrypt');

module.exports ={
    async createBookingAgent(req, res){
        try {
            console.log(req.body);
            const {agent_ID, agent_email, agent_password} = req.body;
            const existentAgent = await BookingAgent.findOne({agent_ID});

            if(!existentAgent){
                const hashedPassword = await bcrypt.hash(agent_password, 10);
                const bookingAgent = await BookingAgent.create({
                    agent_ID,
                    agent_email,
                    agent_password : hashedPassword
                });
                return res.json(bookingAgent);
            } 
            return res.status(400).json({
                message:`agent already exists! do you want to login instead?`
            });
        } catch (error){
            throw Error(`Error while registering a new agent: ${error}`);
        }
    },
    async createTicket (req, res){
        try {
            console.log(req.body);
            const {ticket_ID, customer_email, airline_name, sold_price, card_type,card_num, 
                name_on_card, expiration_date } = req.body;
            const { flight_number } = req.headers;

            const existentFlight = await Flight.findOne({flight_number});
            var current = new Date();
            if(existentFlight){
                const newTicket = await Ticket.create({
                    ticket_ID,
                    customer_email,
                    airline_name, 
                    flight_number,
                    sold_price : parseFloat(sold_price),
                    card_type,
                    card_num,
                    name_on_card,
                    expiration_date,
                    purchase_date : current.getDate(),
                    purchase_time : current.getTime()
                });
                return res.json(newTicket);
            }
            return res.status(400).json({
                message: `There is no such flight`
            });
        } catch (error) {
            throw Error(`Error while creating a new ticket: ${error}}`);
        }
    }
}