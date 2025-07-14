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

router.post('/', crearUsuario); // abierto
router.get('/', verificarJWT, obtenerUsuarios); // protegido
router.get('/:rut', verificarJWT, obtenerUsuarioPorRut);
router.put('/:rut', verificarJWT, actualizarUsuario);
router.patch('/:rut', verificarJWT, actualizarParcialUsuario);
router.delete('/:rut', verificarJWT, eliminarUsuario);

export default router;
