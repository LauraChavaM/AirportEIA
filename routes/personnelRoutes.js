const express = require('express');
const personnelController = require('../controllers/personnelController');

const router = express.Router();

router.get('/', personnelController.getAllPersonnel);
router.get('/:id', personnelController.getPersonnelById);
router.post('/', personnelController.createPersonnel);
router.put('/:id', personnelController.updatePersonnel);
router.delete('/:id', personnelController.deletePersonnel);

module.exports = router;
