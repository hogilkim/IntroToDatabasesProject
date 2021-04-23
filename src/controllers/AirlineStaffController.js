const Airport = require('../models/Airport');
const Airline = require('../models/Airline');
const Airplane = require('../models/Airplane');

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
            const { airplane_id, airline_name, seats } = req.body;
            // const { airline_id } = req.headers;
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
    }
}