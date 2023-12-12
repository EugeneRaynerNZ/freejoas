/**
 * database model for location
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    locationID: String,
    longitude: String,
    Latitude: String,
    address: String,
    date: String,
    time: String,
    uploaderID: String,
    status: String,
    description: String,
    image: String,
    
});

module.exports = mongoose.model("Location", UserSchema);