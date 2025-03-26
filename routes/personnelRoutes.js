const express = require('express');
const router = express.Router();
const personnelController = require('../controller/personnelController');
const authService = require('../services/authService');

router.get('/', authService, personnelController.getAllPersonnel);
router.get('/:id', authService, personnelController.getPersonnelById);
router.post('/', authService, personnelController.createPersonnel);
router.put('/:id', authService, personnelController.updatePersonnel);
router.delete('/:id', authService, personnelController.deletePersonnel);

module.exports = router;
