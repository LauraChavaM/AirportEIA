const { Flight, Personnel, Passenger, Baggage } = require('../models');

const flightController = {

  // Get a flight by ID, including associated personnel and passengers
  getFlightById: async (req, res) => {
    try {
      const flight = await Flight.findByPk(req.params.id, {
        include: [
          {
            model: Personnel, as: 'personnel'
          },
          {
            model: Passenger, as: 'passengers',
            include: [{ model: Baggage, as: 'baggage' }],
          },
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

  // Get all flights, including associated personnel and passengers
  getAllFlights: async (req, res) => {
    try {
      const flights = await Flight.findAll({
        include: [
          {
            model: Personnel, as: 'personnel'
          },
          {
            model: Passenger, as: 'passengers',
            include: [{ model: Baggage, as: 'baggage' }],
          },
        ],
      });
      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  // Create a new flight
  createFlight: async (req, res) => {
    try {
      const { airline, origin, destination, departure_time, arrival_time, departure_gate, arrival_gate } = req.body;

      if (!airline || !origin || !destination || !departure_time || !arrival_time || !departure_gate || !arrival_gate) {
        return res.status(400).json({ message: 'All flight details are required' });
      }

      const newFlight = await Flight.create({
        airline,
        origin,
        destination,
        departure_time,
        arrival_time,
        departure_gate,
        arrival_gate,
      });

      res.status(201).json(newFlight);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update an existing flight
  async updateFlight(req, res) {
    try {
      const flight = await Flight.findByPk(req.params.id);

      if (!flight) return res.status(404).json({ message: 'Flight not found' });

      if (!req.body.departure_time || !req.body.arrival_time) {
        return res.status(400).json({ message: 'Departure and arrival times are required' });
      }

      await flight.update(req.body);
      res.json(flight);
    } catch (error) {

      res.status(400).json({ error: error.message });
    }
  },

  // Change flight status
  async changeFlightStatus(req, res) {
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