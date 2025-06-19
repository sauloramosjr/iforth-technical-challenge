import orm from '@/lib/orm';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const body = await req.json();
  const product = await orm.productionEntry.create({data:body});
  return NextResponse.json(product, { status: 201 });
}