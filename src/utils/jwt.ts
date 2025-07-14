import jwt from 'jsonwebtoken';
import { Usuario } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

// Generar token JWT con info mínima (rut y rol)
export const generateToken = (user: Pick<Usuario, 'rut' | 'rol'>): string => {
  return jwt.sign({ rut: user.rut, rol: user.rol }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Verificar y decodificar token JWT
export const verifyToken = (token: string): { rut: string; rol: string } => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Validación extra para asegurar estructura
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'rut' in decoded &&
      'rol' in decoded &&
      typeof decoded.rut === 'string' &&
      typeof decoded.rol === 'string'
    ) {
      return { rut: decoded.rut, rol: decoded.rol };
    }

    throw new Error('Token con estructura inválida');
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};
