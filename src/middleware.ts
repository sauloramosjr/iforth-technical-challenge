import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { UnauthorizedError } from './lib/exceptions/http/UnauthorizedError';
import { JwtExpiredError } from './lib/exceptions/jwt/JwtExpiredError';
import { JwtInvalidError } from './lib/exceptions/jwt/JwtInvalidError';
import tokenMiddleWare from './lib/validations/tokenValidation';
import { cookies } from 'next/headers';

const publicRoutes = ['/api/login', '/api/signout'];
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
    if (
      error instanceof UnauthorizedError ||
      error instanceof JwtExpiredError ||
      error instanceof JwtInvalidError
    ) {
      (await cookies()).delete('auth_token');
      return NextResponse.redirect(
        new URL('/?errorMessage=' + error.message, request.url)
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
};
