var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var AdminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    interventi: [{
        _id: String
    }],
    photoURL: String
});

AdminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Admin", AdminSchema);

