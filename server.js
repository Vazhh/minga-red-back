import express from "express";
import "dotenv/config.js"
import './config/database.js'
import indexRouter from "./router/index.js";
import cors from 'cors'
import morgan from 'morgan'
// import time from "./middlewares/time.js";
import not_found_handler from "./middlewares/not_found_handler.js";
import error_handler from './middlewares/error_handler.js'

const server = express(); // se crea el servidor
const PORT =  process.env.PORT || 8080;// se define el puerto del servidor
const ready = ()=> console.log('server ready on port ' + PORT);

//middlewares
server.use(express.json()) //permite trabajar con formato json
server.use(express.urlencoded({ extended:true })) //permite capturar consultas complejas
server.use(cors()) //para permitir origenes cruzados (front/back)
server.use(morgan('dev')) //para registrar peticiones HTTP
// server.use(time)

//router + server
server.use('/api',indexRouter)
server.use(not_found_handler)
server.use(error_handler)
server.listen(PORT, ready)// iniciar servidor

//console.log(process.env)


