import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { completed, title } = body;

  const updateData: { completed?: boolean; completedAt?: Date | null; title?: string } = {};

  if (typeof completed === "boolean") {
    updateData.completed = completed;
    updateData.completedAt = completed ? new Date() : null;
  }

  if (typeof title === "string") {
    updateData.title = title.trim();
  }

  const todo = await prisma.todo.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(todo);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.todo.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
