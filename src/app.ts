import dotenv from "dotenv"; //importamos dotenv para manejar variables de entorno
import express from "express"; //importamos el framework express
import cors from "cors"; //importamos cors para manejar las peticiones entre dominios
import usuarioRutas from "./rutas/usuarioRutas"; //importamos las rutas de usuario
import camionRutas from "./rutas/camionRutas"; //importamos las rutas de camion
import alertasRutas from "./rutas/alertasRutas"; //importamos las rutas de alertas
import mantencionRutas from "./rutas/mantencionRutas";
import cookieParser from "cookie-parser"; //importamos cookie-parser para manejar las cookies

dotenv.config(); //cargamos las variables de entorno desde el archivo .env

const app = express(); //creamos una instancia de express

app.use(cookieParser()); //usamos cookie-parser para manejar las cookies

app.use(express.json()); //usamos express.json() para parsear el cuerpo de las peticiones en formato JSON

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
); //usamos cors para permitir peticiones entre dominios
app.use("/usuario", usuarioRutas); //usamos las rutas de usuario, que manejan las peticiones relacionadas con los usuarios

app.use("/camion", camionRutas); //usamos las rutas de camion, que manejan las peticiones relacionadas con los camiones

app.use("/alertas", alertasRutas); //usamos las rutas de alertas, que manejan las peticiones relacionados con las alertas

app.use("/mantencion", mantencionRutas);

console.log("levantando app..."); //mostramos un mensaje en la consola
export default app; //exportamos la instancia de express para usarla en otros archivos
