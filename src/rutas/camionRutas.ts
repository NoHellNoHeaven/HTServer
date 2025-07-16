import express from "express";
import {
  crearCamion,
  actualizarCamion,
  eliminarCamion,
  obtenerCamionPorPatente,
  obtenerCamiones,
  completarMantencion,
} from "../controladores/camionControles";

const router = express.Router();

router.post("/", crearCamion);
router.get("/", obtenerCamiones);
router.get("/:patente", obtenerCamionPorPatente);
router.put("/:patente", actualizarCamion);
router.patch("/:patente", actualizarCamion);
router.delete("/:patente", eliminarCamion);
router.put('/mantenciones/:id/completar', completarMantencion); 
export default router;
