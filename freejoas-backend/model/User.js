/**
 * database model for user
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    collectedLocations: Array,
});

module.exports = mongoose.model("User", UserSchema);