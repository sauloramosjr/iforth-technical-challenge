import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';


export function middleware(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key');

  const path = request.nextUrl.pathname
 
  // if(path.includes('dashboard')){

  //   if(!apiKey || !verifyToken(apiKey)){
  //     return Unauthorized()
  //   }

  // }
  

  return NextResponse.next();
}

const Unauthorized = () => {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
};
