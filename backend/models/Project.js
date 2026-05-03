const mongoose = require("mongoose");

module.exports = mongoose.model("Project", new mongoose.Schema({
  name: String,
  description: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}));