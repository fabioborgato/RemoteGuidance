var mongoose = require("mongoose");

var TicketSchema = mongoose.Schema({
    user: String,
    message: String,
    date: String
});

module.exports = mongoose.model("Ticket", TicketSchema);
