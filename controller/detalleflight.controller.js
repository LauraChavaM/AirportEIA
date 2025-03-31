const { DetalleFlight } = require('../models');

const detalleFlightController = {
  async getAll(req, res) {
    try {
      const detalles = await DetalleFlight.findAll();
      res.json(detalles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const detalle = await DetalleFlight.findByPk(req.params.id);
      if (!detalle) return res.status(404).json({ message: 'Detalle no encontrado' });
      res.json(detalle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const nuevoDetalle = await DetalleFlight.create(req.body);
      res.status(201).json(nuevoDetalle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const detalle = await DetalleFlight.findByPk(req.params.id);
      if (!detalle) return res.status(404).json({ message: 'Detalle no encontrado' });

      await detalle.update(req.body);
      res.json(detalle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const detalle = await DetalleFlight.findByPk(req.params.id);
      if (!detalle) return res.status(404).json({ message: 'Detalle no encontrado' });

      await detalle.destroy();
      res.json({ message: 'Detalle eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = detalleFlightController;
