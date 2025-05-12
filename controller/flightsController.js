const { Flight, Personnel, Passenger, Baggage } = require('../models');

const flightController = {

  getFlightById: async (req, res) => {
    try {
      const flight = await Flight.findByPk(req.params.id, {
        include: [
          { model: Personnel, as: 'personnel' },
          { model: Passenger, as: 'passengers', include: [{ model: Baggage, as: 'baggage' }] }
        ],
      });

      if (!flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }
      res.json(flight);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createFlight: async (req, res) => {
    try {
      const { airline, origin, destination, departure_time, arrival_time, departure_gate, arrival_gate } = req.body;

      const newFlight = await Flight.create({
        airline: airline || null,
        origin: origin || null,
        destination: destination || null,
        departure_time: departure_time || null,
        arrival_time: arrival_time || null,
        departure_gate: departure_gate || null,
        arrival_gate: arrival_gate || null,
      });

      res.status(201).json(newFlight);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateFlight: async (req, res) => {
    try {
      const flight = await Flight.findByPk(req.params.id);
      if (!flight) return res.status(404).json({ message: 'Flight not found' });

      await flight.update(req.body);
      res.json(flight);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  changeFlightStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["Active", "Inactive"].includes(status)) {
        return res.status(400).json({ error: "Invalid Status. Use 'Active' or 'Inactive'." });
      }

      const flight = await Flight.findByPk(id);
      if (!flight) return res.status(404).json({ message: 'Flight not found' });

      flight.status = status;
      await flight.save();

      res.json({ message: `State updated to ${status}`, flight });

    } catch (error) {
      console.error("Error when changing status:", error);
      res.status(400).json({ error: "Internal Server Error." });
    }
  }

};

module.exports = flightController;
