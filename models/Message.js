
var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema ({
  chat_id: String,
  username: String,
  date: String,
  msg: String
});

module.exports = mongoose.model('Message', MessageSchema);
