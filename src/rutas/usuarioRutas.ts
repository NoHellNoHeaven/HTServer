import express from 'express';
import {
  crearUsuario,
  actualizarParcialUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorRut,
  obtenerUsuarios,
} from '../controladores/usuarioControles';
import { verificarJWT} from '../middleware/authMiddleware';

const router = express.Router();

router.post('/usuario', crearUsuario); // abierto
router.get('/usuario', verificarJWT, obtenerUsuarios); // protegido
router.get('/usuario/:rut', verificarJWT, obtenerUsuarioPorRut);
router.put('/usuario/:rut', verificarJWT, actualizarUsuario);
router.patch('/usuario/:rut', verificarJWT, actualizarParcialUsuario);
router.delete('/usuario/:rut', verificarJWT, eliminarUsuario);

export default router;
