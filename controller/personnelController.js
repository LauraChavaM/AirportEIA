//create personnel crud
const { Personnel } = require('../models');

const personnelController = {

    // Get personnel by ID
    getPersonnelById: async (req, res) => {
        try {
            const personnel = await Personnel.findByPk(req.params.id);
            if (!personnel) {
                return res.status(404).json({ message: 'Personnel not found' });
            }
            res.json(personnel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all personnel
    getAllPersonnel: async (req, res) => {
        try {
            const personnel = await Personnel.findAll();
            res.json(personnel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new personnel
    createPersonnel: async (req, res) => {
        try {
            const { name, role, contact, flight_number } = req.body;
            if (!name || !role || !contact || !flight_number) {
                return res.status(400).json({ message: 'Name, role, contact, and flight number are required' });
            }
            const personnel = await Personnel.create({ name, role, contact, flight_number });
            return res.status(201).json({ personnel });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update personnel by ID
    updatePersonnel: async (req, res) => {
        try {
            const { name, role, contact, flight_number } = req.body;
            const personnel = await Personnel.findByPk(req.params.id);
            if (!personnel) {
                return res.status(404).json({ message: 'Personnel not found' });
            }
            if (name) personnel.name = name;
            if (role) personnel.role = role;
            if (contact) personnel.contact = contact;
            if (flight_number) personnel.flight_number = flight_number;
            await personnel.save();
            return res.status(200).json({ message: 'Personnel updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete personnel by ID
    deletePersonnel: async (req, res) => {
        try {
            const personnel = await Personnel.findByPk(req.params.id);
            if (!personnel) {
                return res.status(404).json({ message: 'Personnel not found' });
            }
            await personnel.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};