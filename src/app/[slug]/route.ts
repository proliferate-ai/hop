import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const link = await prisma.link.findUnique({
    where: { slug },
  });

  if (!link) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Record the click
  await prisma.click.create({
    data: {
      linkId: link.id,
      userAgent: request.headers.get("user-agent") || undefined,
      referer: request.headers.get("referer") || undefined,
    },
  });

  return NextResponse.redirect(link.url);
}
