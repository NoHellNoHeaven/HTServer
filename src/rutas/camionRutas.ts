import express from "express";
import {
  crearCamion,
  actualizarCamion,
  eliminarCamion,
  obtenerCamionPorPatente,
  obtenerCamiones,
} from "../controladores/camionControles";

const router = express.Router();

router.post("/", crearCamion);
router.get("/", obtenerCamiones);
router.get("/:patente", obtenerCamionPorPatente);
router.put("/:patente", actualizarCamion);
router.patch("/:patente", actualizarCamion);
router.delete("/:patente", eliminarCamion);

export default router;
