import { ProductionRepository } from '@/features/production/repository';
import { BaseError } from '@/lib/exceptions/BaseError';
import { NextResponse } from 'next/server';

type RouteParams = {
  params: { id: string };
};

export async function GET(_req: Request, { params }: RouteParams) {
  const { id } = params;

  try {
    const production = await ProductionRepository.findOne({
      where: { id },
      select: {
        id: true,
        quantityProduced: true,
        status: true,
        justification: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
        updatedBy: {
          select: {
            id: true,
            name: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!production) {
      return NextResponse.json(
        { message: 'Produção não encontrada.' },
        { status: 404 }
      );
    }

    return NextResponse.json({data:production,status:200, statusText:'Success'});
  } catch (error) {
    if (error instanceof BaseError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { message: 'Erro interno ao buscar produção.' },
      { status: 500 }
    );
  }
}
