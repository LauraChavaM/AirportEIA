const { Passenger, Baggage, Flight } = require('../models');

const passengersController = {

    // Get all passengers, including their flights and baggage
    async getPassengers(req, res) {
        try {
            const passengers = await Passenger.findAll({
                include: [
                    { model: Baggage, as: 'baggage' },
                    { model: Flight, as: 'flights' }, 
                ],
            });
            res.json(passengers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a passenger by ID, including their flights and baggage
    async getPassengerById(req, res) {
        try {
            const passenger = await Passenger.findByPk(req.params.id, {
                include: [
                    { model: Baggage, as: 'baggage' },
                    { model: Flight, as: 'flights' }, 
                ],
            });
            if (!passenger) {
                return res.status(404).json({ message: 'Passenger not found' });
            }
            res.json(passenger);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new passenger, their baggage, and associate them with flights
    async create(req, res) {
        const { name, contact, baggage, flights } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        try {
            // Create the passenger
            const newPassenger = await Passenger.create({ name, contact });

            // Create the baggage and associate it with the passenger
            if (baggage) {
                const newBaggage = await Baggage.create({
                    ...baggage,
                    passenger_id: newPassenger.passenger_id,
                });
                newPassenger.baggage = newBaggage; 
            }

            // Associate the passenger with flights
            if (flights && flights.length > 0) {
                const flightIds = flights.map(flight => flight.id);
                const existingFlights = await Flight.findAll({ where: { id: flightIds } });

                if (existingFlights.length !== flights.length) {
                    return res.status(404).json({ message: 'One or more flights not found' });
                }

                await newPassenger.addFlights(existingFlights); // Use Sequelize's many-to-many association method
            }

            res.status(201).json(newPassenger);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update an existing passenger, their baggage, and their flight associations
    async update(req, res) {
        const { name, contact, baggage, flights } = req.body;

        try {
            const passenger = await Passenger.findByPk(req.params.id, {
                include: [{ model: Baggage, as: 'baggage' }],
            });

            if (!passenger) {
                return res.status(404).json({ message: 'Passenger not found' });
            }

            // Update passenger details
            if (name) passenger.name = name;
            if (contact) passenger.contact = contact;
            await passenger.save();

            // Update baggage details if provided
            if (baggage && passenger.baggage) {
                await passenger.baggage.update(baggage);
            } else if (baggage) {
                // Create baggage if it doesn't exist
                const newBaggage = await Baggage.create({
                    ...baggage,
                    passenger_id: passenger.passenger_id,
                });
                passenger.baggage = newBaggage; 
            }

            // Update flight associations
            if (flights && flights.length > 0) {
                const flightIds = flights.map(flight => flight.id);
                const existingFlights = await Flight.findAll({ where: { id: flightIds } });

                if (existingFlights.length !== flights.length) {
                    return res.status(404).json({ message: 'One or more flights not found' });
                }

                await passenger.setFlights(existingFlights); // Update many-to-many associations
            }

            res.status(200).json(passenger);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete a passenger, their baggage, and their flight associations
    async delete(req, res) {
        try {
            const passenger = await Passenger.findByPk(req.params.id, {
                include: [{ model: Baggage, as: 'baggage' }],
            });

            if (!passenger) {
                return res.status(404).json({ message: 'Passenger not found' });
            }

            // Delete baggage first (if it exists)
            if (passenger.baggage) {
                await passenger.baggage.destroy();
            }

            // Remove flight associations
            await passenger.setFlights([]); // Clear many-to-many associations

            // Delete the passenger
            await passenger.destroy();

            res.status(204).send(); 
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

        // Delete a passenger, their baggage, and their flight associations
    async delete(req, res) {
        // tu código para delete
    },

    // NUEVO: Asignar un pasajero a un vuelo
    async assignPassengerToFlight(req, res) {
        try {
            const { passengerId, flightId } = req.body;
            
            const passenger = await Passenger.findOne({ where: { passenger_id: passengerId } });
            const flight = await Flight.findOne({ where: { flight_number: flightId } });

            if (!passenger || !flight) {
                return res.status(404).json({ message: 'Passenger or Flight not found' });
            }

            await passenger.addFlight(flight);

            res.status(200).json({ message: 'Passenger assigned to flight successfully', passenger });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // Get all flights for a specific passenger 
    async getPassengerFlights(req, res) {
        try {
            const passenger = await Passenger.findByPk(req.params.id, {
                include: [{ model: Flight, as: 'flights' }],
            });

            if (!passenger) {
                return res.status(404).json({ message: 'Passenger not found' });
            }

            res.json(passenger.flights);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

};

module.exports = passengersController;

