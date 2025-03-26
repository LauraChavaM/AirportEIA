const express = require('express');
const passengerController = require('../controller/passengerController'); 

const router = express.Router();

router.get('/', passengerController.getAllPassengers);
router.get('/:id', passengerController.getPassengerById);
router.post('/', passengerController.createPassenger);
router.put('/:id', passengerController.updatePassenger);
router.delete('/:id', passengerController.deletePassenger);

module.exports = router;