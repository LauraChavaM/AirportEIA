const express = require('express');
const router = express.Router();
const servicesController = require('../controller/servicesController');

router.get('/', servicesController.getService);
router.post('/', servicesController.createService);
router.put('/:id', servicesController.updateService);
router.delete('/:id', servicesController.deleteService);

module.exports = router;