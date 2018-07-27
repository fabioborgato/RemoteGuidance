var mongoose = require("mongoose");

var OnlineAdminSchema = new mongoose.Schema({
    userID: String,
    username: String,
    email: String,
    photoURL: String,
    specializzazione: String,
    socketID: String
});

module.exports = mongoose.model("OnlineAdmin", OnlineAdminSchema);

