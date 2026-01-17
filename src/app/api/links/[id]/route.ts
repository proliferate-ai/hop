import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const link = await prisma.link.findUnique({
    where: { id },
    include: {
      _count: {
        select: { clicks: true },
      },
      clicks: {
        orderBy: { timestamp: "desc" },
        take: 100,
      },
    },
  });

  if (!link) {
    return NextResponse.json({ error: "Link not found" }, { status: 404 });
  }

  return NextResponse.json(link);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.link.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
