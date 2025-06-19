import orm from '@/lib/orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const produtos = await orm.productionEntry.findMany();
  return NextResponse.json(produtos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const produto = await orm.productionEntry.create({data:body});
  return NextResponse.json(produto, { status: 201 });
}
