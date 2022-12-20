const mongoose = require("mongoose");
// const mongoose_fuzzy_searching = require('mongoose_fuzzy_searching')
const { Schema } = mongoose;
const credentials = new Schema({
  email: String,
  password: String,
});
const Credentials = mongoose.model("Credentials", credentials);

module.exports = Credentials;
