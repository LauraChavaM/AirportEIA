const { Service } = require('../models');

//crud services
const getService = async (req, res) => {
    try {
        const service = await Service.findAll();
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createService = async (req, res) => {
    try {
        const { name, description, location } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        const service = await Service.create({ name, description, location });
        return res.status(201).json({ service });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateService = async (req, res) => {
    try {
        const { name, description, location } = req.body;
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        if (name) service.name = name;
        if (description) service.description = description;
        if (location) service.location = location;

        await service.save();
        return res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getService, createService, updateService, deleteService };