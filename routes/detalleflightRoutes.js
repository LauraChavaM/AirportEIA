const express = require('express');
const router = express.Router();
const detalleFlightController = require('../controller/detalleflight.controller');

router.get('/', detalleFlightController.getAll);
router.get('/:id', detalleFlightController.getById);
router.post('/', detalleFlightController.create);
router.put('/:id', detalleFlightController.update);
router.delete('/:id', detalleFlightController.delete);

module.exports = router;
