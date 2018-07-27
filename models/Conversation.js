var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema ({
    partecipants : [String],
    messages : [{
      // type: mongoose.Schema.Types.ObjectId,
      // ref : "Message"
      username: String,
      date: String,
      msg: String
    }],
    timestamp: String
});

module.exports = mongoose.model("Conversation", ConversationSchema);
