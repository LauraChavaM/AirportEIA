require("dotenv").config();
//nuestra dependencia para correr el api
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Import routes
const flightsRoutes = require("./routes/flightsRoutes");
const personnelRoutes = require("./routes/personnelRoutes");
const passengersRoutes = require("./routes/passengersRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const userRoutes = require("./routes/userRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");

const app = express();

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// Configure routes
app.use("/api/flights", flightsRoutes);
app.use("/api/personnel", personnelRoutes);
app.use("/api/passengers", passengersRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authenticationRoutes);

// Error handling middleware, sugerencia copilot
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

