const express = require('express');
const router = express.Router();
const servicesController = require('../controller/servicesController');
const authService = require("../services/authService");

router.get('/', authService, servicesController.getService);
router.post('/', authService, servicesController.createService);
router.post('/:id', authService, servicesController.updateService);
router.delete('/:id', authService, servicesController.deleteService);

module.exports = router;