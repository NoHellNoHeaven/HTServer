import express from "express";
import { crearMantencion } from "../controladores/mantencionControles";
import { actualizarMantencion } from "../controladores/mantencionControles";
import { obtenerTodasMantenciones } from "../controladores/mantencionControles";
import { obtenerMantencionPorId } from "../controladores/mantencionControles";
import { eliminarMantencion } from "../controladores/mantencionControles";

const router = express.Router();

router.post("/", crearMantencion);
router.put("/", actualizarMantencion);
router.patch("/:id", actualizarMantencion);
router.get("/", obtenerTodasMantenciones);
router.get("/:id", obtenerMantencionPorId);
router.delete("/", eliminarMantencion);

export default router;
