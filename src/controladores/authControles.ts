import { Request, Response } from 'express';
import prisma from '../models/prisma';
import { compare } from 'bcrypt';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { rut, password } = req.body;

  if (!rut || !password) {
    res.status(400).json({ message: 'Rut y contraseña son obligatorios' });
    return;
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { rut } });

    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const passwordValida = await compare(password, usuario.password);
    if (!passwordValida) {
      res.status(401).json({ message: 'Contraseña incorrecta' });
      return;
    }

    if (usuario.estado !== 'Activo') {
      res.status(403).json({ message: 'Usuario inactivo' });
      return;
    }

    const token = generateToken({ rut: usuario.rut, rol: usuario.rol });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        rut: usuario.rut,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al iniciar sesión',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
