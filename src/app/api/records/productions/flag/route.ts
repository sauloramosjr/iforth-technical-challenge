import { ProductionRepository } from '@/features/production/repository';
import TUpdateProdutoFlag from '@/features/product/types/TProduct';
import { verifyToken } from '@/lib/auth';
import validateBody from '@/lib/validations/attributesRequestValidation';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
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
  const token = (req.cookies.get('auth_token')?.value + '') || req.headers.get("Authorizarion")+'';
  const { userId } = await verifyToken(token);


  const product = await ProductionRepository.update({data:{status:body.status, updatedBy:userId},where:{
  id:body.id
  }});
  return NextResponse.json(product, { status: 201 });
}
