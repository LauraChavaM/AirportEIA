require("dotenv").config();
//nuestra dependencia para correr el api
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser")

//llamar las rutas exportadas desde la carpeta Routes que serán expuestas

const app = express();

//Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//configurar rutas y darle salidas en endpoints

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})