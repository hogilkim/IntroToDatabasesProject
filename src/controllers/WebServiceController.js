const Customer = require('../models/Customer');
const Flight = require('../models/Flight');
const BookingAgent = require('../models/BookingAgent');
const Transaction = require('../models/Transaction');
const Ticket = require('../models/Ticket');
const Rate = require('../models/Rate');

const bcrypt = require('bcrypt');

module.exports ={
    async createTicket (req, res){
        try {
            console.log(req.body);
            const {ticket_ID, customer_email, flight_number, airline_name, sold_price, card_type,card_num, 
                name_on_card, expiration_date } = req.body;
            
            const {customer_ID} = req.params;
            console.log(ticket_ID, customer_email, customer_ID);
            
            const existentFlight = await Flight.findOne({flight_number});
            var current = new Date();
            if(existentFlight){
                const newTicket = await Ticket.create({
                    ticket_ID,
                    customer:customer_ID,
                    customer_email,
                    airline_name, 
                    flight_number,
                    sold_price : parseFloat(sold_price),
                    card_type,
                    card_num,
                    name_on_card,
                    expiration_date,
                    purchase_date : current.getHours(),
                    purchase_time : current.getMinutes()
                });

                await newTicket
                    .populate('customer','-customer_password')
                    .execPopulate();

                return res.json(newTicket);
            }
            return res.status(400).json({
                message: `There is no such flight`
            });
        } catch (error) {
            throw Error(`Error while creating a new ticket: ${error}`);
        }
    },

    async getTicket(req, res){
        const {ticket_id} = req.params;
        try {
            const ticket = await Ticket.findById(ticket_id);
            
            await ticket
                    .populate('customer','-customer_password')
                    .execPopulate();

            return res.json(ticket);
        } catch (error) {
            return res.status(400).json({ message: `Error while finding ticket`});
        }
    },
    async createTransaction (req, res){
        try{
            const {customer_email, ticket_ID, commission_price, transaction_ID} = req.body;
            const {agent_ID} = req.headers;
            console.log(agent_ID);
            const existentCustomer = await Customer.findOne({customer_email});
            const existentTicket = await Ticket.findOne({ticket_ID});
            if (existentCustomer && existentTicket){
                const newTransaction = await Transaction.create({
                    customer_email,
                    agent_ID,
                    ticket_ID,
                    commission_price : parseFloat(commission_price),
                    transaction_ID
                });
                return res.json(newTransaction);
            } 
            return res.status(400).json({
                message: `Please check customer email and ticket`
            })
        } catch (error){
            throw Error(`Error while creating a new transaction: ${error}`);
        }
    },
    async createRate(req, res){
        try{
            const { rate, comment, ticket_ID } = req.body;
            // const { ticket_ID } = req.headers;
            console.log(ticket_ID);
            const existentTicket = await Ticket.findOne({ticket_ID});
            
            if(existentTicket){
                const customer_email = existentTicket.customer_email;
                const flight_number = existentTicket.flight_number;
                console.log(customer_email);
                console.log(flight_number);
                const newRate = await Rate.create({
                    customer_email,
                    flight_number,
                    ticket_ID,
                    rate,
                    comment
                });
                
                return res.json(newRate);
            }
            return res.status(400).json({
                message: `no such ticket`
            });

        } catch (error) {
            throw Error(`Error while creating new Rating ${error}`);
        }
    },
    async getAllFlights(req, res){
        try{
            const flights = await Flight.find({});

            if (flights){
                return res.json(flights);
            }
        } catch (error){
            return res.status(400).json({ message: `We do have any events yet` });
        }
    }
}