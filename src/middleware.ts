import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';
import { UnauthorizedError } from '@/lib/exceptions/UnauthorizedError';

const publicRoutes = ['/api/login'];
const isPublicRoute = (pathname: string) => publicRoutes.includes(pathname);

export async function middleware(request: NextRequest) {
if (request.method === 'OPTIONS') {
  return NextResponse.next();
}

  const { pathname } = request.nextUrl;
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }
  try {
    await tokenMiddleWare(request);
    return NextResponse.next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.redirect(new URL('/?errorMessage='+error.message, request.url))
    }

    return NextResponse.json({ message: 'Erro de Servidor.' }, { status: 500 });
  }
}

const tokenMiddleWare = async (request: NextRequest) => {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) {
    throw new UnauthorizedError('Não autorizado. Token não encontrado.');
  }
  try {
   await verifyToken(token);
  } catch (error: unknown) {
    if(error instanceof UnauthorizedError){
      throw error;
    }
    throw new Error((error as Error).message)
  }
};
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
};
