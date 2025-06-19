import { handleLogin } from '@/features/login/services/LoginServerService';
import TLogin from '@/features/login/types/TLogin';
import { BadRequestError } from '@/lib/exceptions/BadRequestError';
import { UnauthorizedError } from '@/lib/exceptions/UnauthorizedError';
import validateBody from '@/lib/validations/verifyAttributesRequest';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TLogin;

    const validation = validateBody<TLogin>(body, ['name', 'password']);

    if (!validation.success) {
      if (!validation.success) {
        throw new BadRequestError(validation.message);
      }
    }

    const user = await handleLogin(body.name, body.password);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
