const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FreejoasModel = Schema({
    latitude: String,
    longitude: String,
    status: Boolean,
    title: String,
    amount: String,
    createdAt: Date,
    updatedAt: Date,
},{
    timestamps: true,
});

module.exports =  mongoose.model('Freejoas', FreejoasModel);

