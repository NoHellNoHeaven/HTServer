import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

export const generateToken = (user: { email: string; rol: string }): string => {
  return jwt.sign({ email: user.email, rol: user.rol }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): { email: string; rol: string } => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'email' in decoded &&
      'rol' in decoded &&
      typeof decoded.email === 'string' &&
      typeof decoded.rol === 'string'
    ) {
      return { email: decoded.email, rol: decoded.rol };
    }

    throw new Error('Token con estructura inválida');
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};
