const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transaction_ID: String,
    customer_email:{
        type:String,
        ref:"Customer"
    },
    agent_ID: {
        type: String,
        ref: "BookingAgent"
    },
    ticket_ID:{
        type:String,
        ref:"Ticket"
    },
    commision_pirce: Number
});

module.exports = mongoose.model('Transaction', TransactionSchema);