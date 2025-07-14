import jwt from 'jsonwebtoken';
import { Usuario } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

// Payload que guardaremos en el token
type JwtPayload = {
  rut: string;
  rol: Usuario['rol'];
};

// Generar token JWT
export const generateToken = (user: Pick<Usuario, 'rut' | 'rol'>): string => {
  return jwt.sign(
    { rut: user.rut, rol: user.rol },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Verificar token JWT
export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // El decoded puede ser string o object, aseguramos tipo
    if (typeof decoded === 'string') {
      throw new Error('Token inválido');
    }
    return decoded as JwtPayload;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};
