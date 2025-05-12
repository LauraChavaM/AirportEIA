const express = require('express');
const router = express.Router();
const flightsController = require('../controller/flightsController');
const authService = require("../services/authService");

router.get('/:id', authService, flightsController.getFlightById);
router.get('/', authService, flightsController.getAllFlights);
router.post('/', authService, flightsController.createFlight);
router.post('/:id', authService, flightsController.updateFlight)
router.post("/changeStatus/:id", authService,flightsController.changeFlightStatus);

module.exports = router;
