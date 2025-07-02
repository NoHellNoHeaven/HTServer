import express from "express";
import {
  crearCamion,
  actualizarCamion,
  eliminarCamion,
  obtenerCamionPorPatente,
  obtenerCamiones,
} from "../controladores/camionControles";

const router = express.Router();

router.post("/camiones", crearCamion);
router.get("/camiones", obtenerCamiones);
router.get("/camiones/:patente", obtenerCamionPorPatente);
router.put("/camiones/:patente", actualizarCamion);
router.patch("/camiones/:patente", actualizarCamion);
router.delete("/camiones/:patente", eliminarCamion);

export default router;
