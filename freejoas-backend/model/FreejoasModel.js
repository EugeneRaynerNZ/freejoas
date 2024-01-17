const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FreejoasModel = Schema({
    freejoaName: String,
    longitude: String,
    latitude: String,
    status: String,
    description: String,
    address: String,
    city: String,
},{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true,transform: (doc, ret) => { delete ret._id; } },
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

