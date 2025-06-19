import orm from '@/lib/orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await orm.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const product = await orm.product.create({data:body});
  return NextResponse.json(product, { status: 201 });
}
