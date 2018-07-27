var mongoose = require("mongoose");

var ResourceSchema = new mongoose.Schema({
    fileName: String,
    fileURL: String,
    date: Date,
    notes: String
});

module.exports = mongoose.model("Resource", ResourceSchema);
