import { compare, genSaltSync, hash } from 'bcrypt-ts';
import { SignJWT, jwtVerify } from 'jose';
import { exceptions } from '../exceptions/exceptions';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const SALT_ROUNDS = 10;

export const generateToken = async (userId: string) => {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10m')
    .sign(JWT_SECRET);

  return token;
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {});
    return payload as { userId: string };
  } catch (err) {
    throw exceptions(err);
  }
};

export const refreshToken = async (oldToken: string) => {
  try {
    const payload = await verifyToken(oldToken);
    return generateToken(payload.userId);
  } catch (err) {
    throw exceptions(err);
  }
};

export const encriptPassword = async (password: string) => {
  const salt = genSaltSync(SALT_ROUNDS);
  return hash(password, salt);
};
export const decriptPassword = async (passwordA: string, passwordB: string) => {
  return await compare(passwordA, passwordB);
};
