import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { JWSInvalid, JWTExpired } from 'jose/errors';
import { UnauthorizedError } from '../exceptions/UnauthorizedError';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const SALT_ROUNDS = 10;

export const generateToken = async (userId: string) => {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // ou '1d', '2h', etc.
    .sign(JWT_SECRET);

  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {});
    return payload as { userId: string };
  } catch (err) {
    if (err instanceof JWTExpired) {
      throw new UnauthorizedError('Token expirado');
    }
    if (err instanceof JWSInvalid) {
      throw new UnauthorizedError('Token inválido');
    }
    throw new Error('Erro desconhecido ao verificar');
  }
};

export const refreshToken = async (oldToken: string) => {
  const payload = await verifyToken(oldToken);
  return generateToken(payload.userId);
};

export const encriptPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};
