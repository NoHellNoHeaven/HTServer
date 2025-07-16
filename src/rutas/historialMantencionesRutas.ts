import express from "express";
import {
  obtenerHistorialCompleto,
  obtenerHistorialPorCamion,
  registrarMantencionCompletada,
  eliminarRegistroHistorial,
} from "../controladores/historialMantencionesControles";

const router = express.Router();

// Obtener todo el historial
router.get("/", obtenerHistorialCompleto);

// Obtener historial por camión
router.get("/camion/:patente", obtenerHistorialPorCamion);

// Registrar mantención completada
router.post("/registrar", registrarMantencionCompletada);

// Eliminar registro del historial
router.delete("/:id", eliminarRegistroHistorial);

export default router; 