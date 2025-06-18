import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');

//   if (!apiKey || !verifyToken(apiKey)) {
//     return returnUnauthorized(); 
//   }

  return NextResponse.next();
}

const returnUnauthorized = () => {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
};
