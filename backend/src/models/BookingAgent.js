const mongoose = require('mongoose');

const BookingAgentSchema = new mongoose.Schema({
    agent_ID: String,
    agent_email: String,
    agent_password: String
});

module.exports = mongoose.model('BookingAgent', BookingAgentSchema);