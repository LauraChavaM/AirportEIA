const express = require('express');
const router = express.Router();
const flightsController = require('../controller/flightsController');
const authService = require("../services/authService");

router.get('/:id', authService, flightsController.getFlightById);
router.post('/', authService, flightsController.createFlight);
router.put('/:id', authService, flightsController.updateFlight);

module.exports = router;
