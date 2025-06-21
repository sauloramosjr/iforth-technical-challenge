import { NextRequest } from 'next/server';
import { UnauthorizedError } from '../exceptions/http/UnauthorizedError';
import { verifyToken } from '../auth';
import { exceptions } from '../exceptions/exceptions';

const tokenMiddleWare = async (request: NextRequest) => {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    throw new UnauthorizedError('Não autorizado. Token não encontrado.');
  }
  try {
   await verifyToken(token);
  } catch (error) {
   throw exceptions(error)
  }
};

export default tokenMiddleWare