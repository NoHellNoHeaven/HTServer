import express from "express";
import {
  crearAlertas,
  actualizarAlerta,
  eliminarAlerta,
  obtenerAlertaPorId,
  obtenerAlertas,
} from "../controladores/alertasControles";

const router = express.Router();

router.post("/alertas", crearAlertas);
router.get("/alertas", obtenerAlertas);
router.get("/alertas/:id", obtenerAlertaPorId);
router.put("/alertas/:id", actualizarAlerta);
router.patch("/alertas/:id", actualizarAlerta);
router.delete("/alertas/:id", eliminarAlerta);

export default router;
