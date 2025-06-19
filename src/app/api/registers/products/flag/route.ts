import TUpdateProdutoFlag from '@/features/product/types/TUpdateProductFlag';
import orm from '@/lib/orm';
import validateBody from '@/lib/validations/verifyAttributesRequest';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const body = (await req.json()) as TUpdateProdutoFlag;
  const validation = validateBody<TUpdateProdutoFlag>(body, ['id', 'status']);

  if (!validation.success) {
    return NextResponse.json(
      {
        status: 400,
        message: validation.message,
      },
      { status: 400 }
    );
  }

  const product = await orm.product.update({
    where: { id: body.id },
    data: { status: body.status },
  });
  return NextResponse.json(product, { status: 201 });
}
