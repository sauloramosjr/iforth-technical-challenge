import { ProductionRepository } from '@/features/production/repository';
import { TProductionCreate } from '@/features/production/types/TProduction';
import { verifyToken } from '@/lib/auth';
import { BaseError } from '@/lib/exceptions/BaseError';
import { parseSelectParam } from '@/lib/httpUtils/parseSelectParams';
import { Prisma, Status } from '@/lib/orm/generated';
import validateBody from '@/lib/validations/attributesRequestValidation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = (page - 1) * limit;

  const filters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    const match = key.match(/^filter\[(.*)\]$/);
    if (match) {
      const field = match[1];
      filters[field] = value;
    }
  });

  // Montando WHERE com base nos filtros
  const where: Prisma.ProductionEntryWhereInput = {};

  if (filters.status) {
    where.status = filters.status as Status;
  }
  if (filters.quantityProduced) {
    where.quantityProduced = { gte: parseFloat(filters.quantityProduced) };
  }
  if (filters.product) {
    where.productId = { equals: filters.product, mode: 'insensitive' };
  }
  if (filters.justification) {
    where.justification = {
      contains: filters.justification,
      mode: 'insensitive',
    };
  }

  // Montando ORDER BY
  const sortParam = searchParams.get('sort');
  let orderBy: Prisma.ProductionEntryOrderByWithRelationInput = {
    createdAt: 'asc',
  };

  if (sortParam) {
    const [field, direction] = sortParam.split(':');
    if (
      field &&
      direction &&
      (direction.toLowerCase() === 'asc' || direction.toLowerCase() === 'desc')
    ) {
      orderBy = { [field]: direction.toLowerCase() as 'asc' | 'desc' };
    }
  }

  const select = parseSelectParam(
    searchParams.get('fields'),
    {
      id: true,
      justification: true,
      product: {
        select: {
          id: true,
          name: true,
          maxProduction: true,
          minProduction: true,
        },
      },
      quantityProduced: true,
      status: true,
    },
    'product'
  );

  try {
    const [products, total] = await Promise.all([
      ProductionRepository.list({
        where,
        skip,
        take: limit,
        select,
        orderBy,
      }),
      ProductionRepository.count(where),
    ]);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    if (error instanceof BaseError)
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );

    return NextResponse.json({ message: 'Erro de Servidor!' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token =
    req.cookies.get('auth_token')?.value + '' ||
    req.headers.get('Authorizarion') + '';

  const body = (await req.json()) as TProductionCreate;
  const validation = validateBody<TProductionCreate>(body, [
    'productId',
    'quantityProduced',
  ]);
  if (!validation.success) {
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 }
      );
    }
  }

  const { userId } = await verifyToken(token);

  const { productId, quantityProduced, justification } = body;

  const _quantityProduced = parseInt(`${quantityProduced}`);

  const product = await ProductionRepository.create({
    productId,
    justification,
    quantityProduced: _quantityProduced,
    userId,
  });
  return NextResponse.json(product, { status: 201 });
}
