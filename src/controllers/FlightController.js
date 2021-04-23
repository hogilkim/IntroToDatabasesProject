const Flight = require('../models/Flight');
// flight_number: String,
// airline_name: String,
// depart_airport: String,
// depart_time: String,
// depart_date: Date,
// arrival_airport: String,
// arrival_time: String,
// arrival_date: Date,
// base_price: Number,
// airplane_id: String,
// status: String,
module.exports = {
    async createFlight(req, res){
        const {flight_number, airline_name, depart_airport, depart_time, 
            depart_date, arrival_airport, arrival_time, arrival_date, base_price, airplane_id, status} = req.body;
    }
}