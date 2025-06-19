import orm from '@/lib/orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await orm.product.findMany();
  return NextResponse.json(products);
}
