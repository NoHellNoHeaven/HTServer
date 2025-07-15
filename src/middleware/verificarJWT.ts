import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import prisma from '../models/prisma';
import { Usuario } from '@prisma/client';

export interface RequestConUsuario extends Request {
  usuario?: Usuario;
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
    const decoded = verifyToken(token);

    const usuario = await prisma.usuario.findUnique({ where: { email: decoded.email} });
    console.log(`Estado del usuario ${usuario?.email}:`, usuario?.estado);


    if (!usuario || usuario.estado?.toLocaleLowerCase() !== 'activo') {
      res.status(401).json({ message: 'Usuario inválido o inactivo' });
      return;
    }

    req.usuario = usuario;
    next();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Token inválido o expirado';
    res.status(401).json({ message: errorMessage });
  }
};
