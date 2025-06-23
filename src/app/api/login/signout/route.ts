    // app/api/route.js (Route Handler)
    import { cookies } from 'next/headers';
    import { NextResponse } from 'next/server';

    export async function GET() {
      (await cookies()).delete('auth_token');
      return NextResponse.json({ message: 'Cookie deleted' });
    }