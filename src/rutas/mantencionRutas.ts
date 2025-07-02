import express from "express";
import { crearMantencion } from "../controladores/mantencionControles";
import { actualizarMantencion } from "../controladores/mantencionControles";
import { obtenerTodasMantenciones } from "../controladores/mantencionControles";
import { obtenerMantencionPorId } from "../controladores/mantencionControles";
import { eliminarMantencion } from "../controladores/mantencionControles";

const router = express.Router();

router.post("/mantencion", crearMantencion);
router.put("/mantencion", actualizarMantencion);
router.patch("/mantencion/:id", actualizarMantencion);
router.get("/mantencion", obtenerTodasMantenciones);
router.get("/mantencion/:id", obtenerMantencionPorId);
router.delete("/mantencion", eliminarMantencion);

export default router;
