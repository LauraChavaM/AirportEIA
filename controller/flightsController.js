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

  // Create a new flight
  createFlight: async (req, res) => {
    const { passengers, personnel, ...flightData } = req.body;

    if (!passengers || passengers.length === 0) {
      return res.status(400).json({ message: 'Passengers are required' });
    }
    if (!personnel || personnel.length === 0) {
      return res.status(400).json({ message: 'Personnel are required' });
    }

    try {
      const newFlight = await Flight.create(flightData);

      for (const passenger of passengers) {
        const existingPassenger = await Passenger.findByPk(passenger.id);
        if (!existingPassenger) {
          return res.status(404).json({ message: `Passenger with ID ${passenger.id} not found` });
        }

      }

      for (const person of personnel) {
        const existingPersonnel = await Personnel.findByPk(person.id);
        if (!existingPersonnel) {
          return res.status(404).json({ message: `Personnel with ID ${person.id} not found` });
        }
      }

      //Associating Passengers and Personnel with the Flight dice copilot
      //await newFlight.addPassengers(passengers.map(p => p.id));
      //await newFlight.addPersonnel(personnel.map(p => p.id));

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
      res.status(400).json({ error: "Internal Server Error."  });
    }
  }

};

module.exports = flightController;