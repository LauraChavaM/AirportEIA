const express = require('express');
const router = express.Router();
const flightsController = require('../controller/flightsController');

router.get('/:id', flightsController.getFlightById);
router.post('/', flightsController.createFlight);
router.put('/:id', flightsController.updateFlight);

module.exports = router;
