import express from "express";
import {
  crearAlertas,
  actualizarAlerta,
  eliminarAlerta,
  obtenerAlertaPorId,
  obtenerAlertas,
} from "../controladores/alertasControles";

const router = express.Router();

router.post("/", crearAlertas);
router.get("/", obtenerAlertas);
router.get("/:id", obtenerAlertaPorId);
router.put("/:id", actualizarAlerta);
router.patch("/:id", actualizarAlerta);
router.delete("/:id", eliminarAlerta);

export default router;
