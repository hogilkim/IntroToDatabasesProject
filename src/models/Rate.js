const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
   ticket_ID :{
       type: String,
       ref: "Ticket"
   },
   flight_number : {
       type: String,
       ref: "Flight"
   },
   customer_email : {
        type:String,
        ref: "Customer"
   },
   rate : Number,
   comment: String
});

module.exports = mongoose.model('Rate', RateSchema);