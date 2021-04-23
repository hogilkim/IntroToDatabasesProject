const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    flight_number: String,
    airline_name: String,
    depart_airport: String,
    depart_time: String,
    depart_date: Date,
    arrival_airport: String,
    arrival_time: String,
    arrival_date: Date,
    base_price: String,
    airplane_id: String,
    status: String,
});

module.exports = mongoose.model('Flight', FlightSchema);