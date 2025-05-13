const express = require('express');
const router = express.Router();
const passengerController = require('../controller/passengerController'); 
const authService = require("../services/authService");

// Rutas protegidas con authService
router.get('/', authService, passengerController.getPassengers);
router.get('/:id', authService, passengerController.getPassengerById);
router.post('/', authService, passengerController.create);
router.put('/:id', authService, passengerController.update); // <-- CORREGIDO: PUT en lugar de POST
router.delete('/:id', authService, passengerController.delete);
router.get('/:id/flights', authService, passengerController.getPassengerFlights);   

// Nueva ruta para asignar pasajero a vuelo
router.post('/assign', authService, passengerController.assignPassengerToFlight); // <-- NUEVO

module.exports = router;
