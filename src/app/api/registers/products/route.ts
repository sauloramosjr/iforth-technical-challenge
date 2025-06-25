import { ProductRepository } from '@/features/product/repository';
import { TProductCreate } from '@/features/product/types/TProduct';
import { verifyToken } from '@/lib/auth';
import { parseSelectParam } from '@/lib/httpClient/utils/parseSelectParams';
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
console.log(filters)
  const where: Prisma.ProductWhereInput = {};

  if (filters.status) {
    where.status = filters.status as Status;
  }
  if (filters.name) {
       where.name = { contains: filters.name, mode: 'insensitive' };
  }
  if (filters.maxProduction) {
    where.maxProduction = { gte: parseFloat(filters.maxProduction) };
  }
  if (filters.minProduction) {
    where.minProduction = { gte: parseFloat(filters.minProduction) };
  }

  const sortParam = searchParams.get('sort');
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'asc' };

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

  const select = parseSelectParam<Prisma.ProductSelect>(
    searchParams.get('fields'),
    {
      id: true,
      name: true,
      maxProduction: true,
      minProduction: true,
      status: true,
    }
  );

  const [products, total] = await Promise.all([
    ProductRepository.list({
      where,
      skip,
      take: limit,
      select,
      orderBy,
    }),
    ProductRepository.count(where),
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
}

export async function POST(req: NextRequest) {
  const token =
    req.cookies.get('auth_token')?.value + '' ||
    req.headers.get('Authorizarion') + '';

  const body = (await req.json()) as TProductCreate;
  const validation = validateBody<TProductCreate>(body, [
    'name',
    'maxProduction',
    'maxProduction',
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
  const { minProduction, name, maxProduction } = body;

  const _maxProduction = parseInt(`${maxProduction}`);
  const _minProduction = parseInt(`${minProduction}`);

  const product = await ProductRepository.create({
    maxProduction: _maxProduction,
    minProduction: _minProduction,
    name,
    userId,
  });
  return NextResponse.json(product, { status: 201 });
}
