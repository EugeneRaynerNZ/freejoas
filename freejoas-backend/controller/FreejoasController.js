//import model
const FreejoasModel = require('../model/FreejoasModel');

const freejoaController = {
    //get all freejoas
    getAllFreejoas: async (req, res) => {
        try{
            const freejoas = await FreejoasModel.find();
            res.json(freejoas);
        }catch(err){
            res.json({message: err});
        }
    },
    //get freejoa by ID
    getFreejoa: async (req, res) => {
        try{
            const freejoa = await FreejoasModel.findById(req.params.freejoaID);
            res.json(freejoa);
        }catch(err){
            res.json({message: err});
        }
    },
    //create a freejoa
    createFreejoa: async (req, res) => {
        const freejoa = new FreejoasModel({
            freejoasID: req.body.freejoasID,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            status: req.body.status,
            description: req.body.description
        });
        try{
            const savedFreejoa = await freejoa.save();
            console.log(savedFreejoa);
            res.json(savedFreejoa);
        }catch(err){
            res.json({message: err});
        }
    },
    //update a freejoa
    updateFreejoa: async (req, res) => {
        try{
            const updatedFreejoa = await FreejoasModel.updateOne(
                {_id: req.params.freejoasID},
                {$set: {
                    longitude: req.body.longitude,
                    latitude: req.body.latitude,
                    status: req.body.status,
                    description: req.body.description
                }}
            );
            res.json(updatedFreejoa);
        }catch(err){
            res.json({message: err});
        }
    },
    //delete a freejoa
    deleteFreejoa: async (req, res) => {
        try{
            const deletedFreejoa = await FreejoasModel.deleteOne({_id: req.params.freejoaID});
            res.json(deletedFreejoa);
        }catch(err){
            res.json({message: err});
        }
    }
}

module.exports = freejoaController;