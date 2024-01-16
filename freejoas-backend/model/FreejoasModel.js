const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FreejoasModel = Schema({
    freejoasID: String,
    freejoaName: String,
    longitude: String,
    latitude: String,
    status: String,
    description: String
},{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
);

FreejoasModel.method.toJSON = function(){
    const freejoa = this.toObject();
    delete freejoa._id;
    delete freejoa.__v;
    return freejoa;
}

module.exports =  mongoose.model('Freejoas', FreejoasModel);

