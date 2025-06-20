import orm from '@/lib/orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    orm.product.findMany({
      skip,
      take: limit,
    }),
    orm.product.count(),
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

export async function POST(req: Request) {
  const body = await req.json();
  const product = await orm.product.create({data:body});
  return NextResponse.json(product, { status: 201 });
}
