import { Router, Request, Response } from 'express';
import { verificarJWT, RequestConUsuario } from '../middleware/verificarJWT';
import { autorizarRoles } from '../middleware/autorizarRoles';

const router = Router();

router.get(
  '/admin-only',
  verificarJWT,
  autorizarRoles(['Admin']),
  (req: Request, res: Response) => {
    const usuario = (req as RequestConUsuario).usuario;
    res.status(200).json({
      message: `Acceso permitido solo para Admins. Hola ${usuario?.rut}`,
    });
  }
);

router.get(
  '/admin-o-chofer',
  verificarJWT,
  autorizarRoles(['Admin', 'Chofer']),
  (req: Request, res: Response) => {
    const usuario = (req as RequestConUsuario).usuario;
    res.status(200).json({
      message: `Acceso permitido para Admin y Chofer. Hola ${usuario?.rut}`,
    });
  }
);

export default router;
