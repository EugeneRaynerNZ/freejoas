const express = require('express');
const router = express.Router();
const freejoaController = require('../controller/FreejoasController');

//get all freejoas
router.get('/freejoas', freejoaController.getAllFreejoas);

//get freejoa by ID
router.get('/:freejoaID', freejoaController.getFreejoaByID);

//create a freejoa
router.post('/newfreejoa', freejoaController.createFreejoa);

//update a freejoa
// router.patch('/:freejoaID', freejoaController.updateFreejoa);

//delete a freejoa
router.delete('/:freejoaID', freejoaController.deleteFreejoa);

//delete all freejoas
router.delete('/all', freejoaController.deleteAllFreejoas);

module.exports = router;