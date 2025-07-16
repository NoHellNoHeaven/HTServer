import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import usuarioRutas from "./rutas/usuarioRutas";
import camionRutas from "./rutas/camionRutas";
import historialMantencionesRutas from "./rutas/historialMantencionesRutas";

import protegidasRoutes from './rutas/protegidasRutas';
import authRutas from './rutas/authRutas';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
//rutas de autenticación
app.use('/auth', authRutas);

// Rutas públicas
app.use("/usuario", usuarioRutas);
app.use("/camiones", camionRutas);
app.use("/historial-mantenciones", historialMantencionesRutas);

// Rutas protegidas
app.use('/api/protegidas', protegidasRoutes);

console.log("Levantando app...");
export default app;
