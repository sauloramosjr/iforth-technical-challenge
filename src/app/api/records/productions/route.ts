import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const produtos = await prisma.productionEntry.findMany();
  return NextResponse.json(produtos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const produto = await prisma.productionEntry.create({data:body});
  return NextResponse.json(produto, { status: 201 });
}
