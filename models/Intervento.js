var mongoose = require("mongoose");

var InterventionSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    duration: Number,
    videoURL: String,
    tecniciSede: [
      String
    ],
    tecniciCampo: [
      String
  ],
    chatId: String
});

module.exports = mongoose.model("Intervention", InterventionSchema);
