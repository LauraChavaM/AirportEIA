const express = require('express');
const router = express.Router();
const passengerController = require('../controller/passengerController'); 
const authService = require("../services/authService");

router.get('/', authService, passengerController.getPassengers);
router.get('/:id', authService, passengerController.getPassengerById);
router.post('/', authService, passengerController.create);
router.post('/:id', authService, passengerController.update);
router.delete('/:id', authService, passengerController.delete);

module.exports = router;