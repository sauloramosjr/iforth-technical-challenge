import { ProductRepository } from '@/features/product/repository';
import { BaseError } from '@/lib/exceptions/BaseError';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest) {
  const id = _req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Id necessário!' }, { status: 400 });
  }

  try {
    const production = await ProductRepository.findOne({
      where: { id },
      select: {
        id: true,
        status: true,
        name: true,
        minProduction: true,
        maxProduction: true,
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
      },
    });

    if (!production) {
      return NextResponse.json(
        { message: 'Produção não encontrada.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data: production,
      status: 200,
      statusText: 'Success',
    });
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
