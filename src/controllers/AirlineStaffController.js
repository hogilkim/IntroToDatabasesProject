const Airport = require('../models/Airport');
const Airline = require('../models/Airline');
const Airplane = require('../models/Airplane');
const Flight = require('../models/Flight');
const AirlineStaff = require('../models/AirlineStaff');
const Customer = require('../models/Customer');

const bcrypt = require('bcrypt');

module.exports ={
    async createStaff(req, res){
        try {
            console.log(req.body);
            const {staff_username, staff_password, first_name, last_name, date_of_birth, staff_phone} = req.body;
            const {airline_name} = req.headers;
            const existentStaff = await AirlineStaff.findOne({staff_username});
            const existentAirline = await Airline.findOne({airline_name});

            if(!existentAirline){
                return res.status(400).json({message: `No Such Airline!`});
            }

            if (!existentStaff) {
                const hashedPassword = await bcrypt.hash(staff_password, 10);
                const airlineStaff = AirlineStaff.create({
                    staff_username,
                    staff_password : hashedPassword,
                    first_name,
                    last_name,
                    date_of_birth,
                    staff_phone,
                    airline_name
                });
                return res.json(airlineStaff);
            }
            return res.status(400).json({
                message:`staff already exists! do you want to login instead?`
            });
        } catch(error){
        throw Error(`Error while registering a new user: ${error}`);
        }
    },

    async createAirport(req, res){
        try {
            const { airport_name, city } = req.body;
    
            const existentAirport = await Airport.findOne({airport_name});
    
            if(!existentAirport){
                const airport = Airport.create({
                    airport_name,
                    city
                });
                return res.json(airport);
            }
            return res.status(400).json({
                message: `airport already exists`
            });
            
        } catch (error) {
            throw Error(`Error while creating new airport: ${error}`);
        }
    },

    async createAirline(req, res){
        try {
            const { airline_name } = req.body;
            const existentAirline = await Airline.findOne({airline_name});
            if(!existentAirline){
                const airline = Airline.create({
                    airline_name
                });
                return res.json(airline);
            }
            return res.status(400).json({
                message: `airline already exists`
            });
        } catch (error) {
            throw Error(`Error while creating new airline: ${error}`);
        }
    },

    async createAirplane(req, res){
        try {
            const { airplane_id, seats } = req.body;
            const { airline_name } = req.headers;
            const existentAirline = await Airline.findOne({airline_name});

            if (!existentAirline){
                return res.status(400).json({ message: `Airline does not exist!`});
            }
            const airplane = await Airplane.create({
                airplane_id,
                airline_name,
                seats
            })
            return res.json(airplane);
        } catch (error) {
            throw Error(`Error while creating new airplane: ${error}`);
        }
    },

    async createFlight(req, res){
        try {
            const { flight_number, depart_time, depart_date, arrival_time, 
                arrival_date, base_price, status, depart_airport, arrival_airport, airplane_id} = req.body
            const { airline_name } = req.headers;
            console.log(airplane_id);
            const existentAirline = await Airline.findOne({airline_name});
            const existentDepartureAirport = await Airport.findOne({airport_name: depart_airport});
            const existentArrivalAirport = await Airport.findOne({airport_name: arrival_airport});
            const existentPlane = await Airplane.findOne({airplane_id});

            if(!existentAirline){
                return res.status(400).json({message: `No Such Airline!`})
            }
            if(!existentDepartureAirport){
                return res.status(400).json({message: `No Such Departure Airport!`})
            }
            if(!existentArrivalAirport){
                return res.status(400).json({message: `No Such Arrival Airport!`})
            }
            if(!existentPlane){
                return res.status(400).json({message: `No Such Plane!`})
            }

            const flight = await Flight.create({
                flight_number, depart_time, depart_date, arrival_time, 
                arrival_date, base_price: parseFloat(base_price), 
                status, airline_name, depart_airport, arrival_airport, airplane_id
            })
            return res.json(flight);


        } catch (error) {
            throw Error(`Error while creating new flight: ${error}`);
        }
    }
}
