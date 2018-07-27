var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    interventi: [ String ],
    company: String,
    photoURL: String,
    conversations: [ String ]
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);

