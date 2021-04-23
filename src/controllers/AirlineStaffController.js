const Airport = require('../models/Airport');
const Airline = require('../models/Airline');
const Airplane = require('../models/Airplane');
const Flight = require('../models/Flight');

module.exports ={
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
