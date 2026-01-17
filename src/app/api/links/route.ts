import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateSlug, isValidUrl } from "@/lib/utils";

export async function GET() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { clicks: true },
      },
    },
  });

  return NextResponse.json(links);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { url, slug: customSlug } = body;

  if (!url || !isValidUrl(url)) {
    return NextResponse.json(
      { error: "Invalid URL provided" },
      { status: 400 }
    );
  }

  const slug = customSlug || generateSlug();

  // Check if slug already exists
  const existing = await prisma.link.findUnique({
    where: { slug },
  });

  if (existing) {
    return NextResponse.json(
      { error: "This slug is already taken" },
      { status: 409 }
    );
  }

  const link = await prisma.link.create({
    data: {
      slug,
      url,
    },
    include: {
      _count: {
        select: { clicks: true },
      },
    },
  });

  return NextResponse.json(link, { status: 201 });
}
