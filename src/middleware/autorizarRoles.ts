import { Response, NextFunction } from 'express';
import { RequestConUsuario } from './verificarJWT';

export const autorizarRoles = (rolesPermitidos: string[]) => {
  return (req: RequestConUsuario, res: Response, next: NextFunction): void => {
    const usuario = req.usuario;

    if (!usuario) {
      res.status(401).json({ message: 'No autorizado. Usuario no autenticado.' });
      return;
    }

    if (!rolesPermitidos.includes(usuario.rol)) {
      res.status(403).json({ message: 'Acceso denegado. Rol insuficiente.' });
      return;
    }

    next();
  };
};
