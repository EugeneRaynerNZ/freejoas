/**
 * database model for location
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    locationID: String,
    longitude: String,
    Latitude: String,
    status: String,
    description: String
});

module.exports = mongoose.model("Location", UserSchema);