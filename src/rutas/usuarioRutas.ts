import express from "express";
import {
  crearUsuario,
  actualizarParcialUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorRut,
  obtenerUsuarios,
} from "../controladores/usuarioControles";

const router = express.Router();

router.post("/usuario", crearUsuario);
router.get("/usuario", obtenerUsuarios);
router.get("/usuario/:rut", obtenerUsuarioPorRut);
router.put("/usuario/:rut", actualizarUsuario);
router.patch("/usuario/:rut", actualizarParcialUsuario);
router.delete("/usuario/:rut", eliminarUsuario);

export default router;
// Exportamos el router para que pueda ser utilizado en otros archivos
