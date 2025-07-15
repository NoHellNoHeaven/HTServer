import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import prisma from '../models/prisma';

interface RequestConUsuario extends Request {
  usuario?: any;
}

export const verificarJWT = async (
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token) as { email: string; rol: string };
    const usuario = await prisma.usuario.findUnique({ where: { email: decoded.email } });

    if (!usuario || usuario.estado !== 'Activo') {
      res.status(401).json({ message: 'Usuario inválido o inactivo' });
      return;
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
