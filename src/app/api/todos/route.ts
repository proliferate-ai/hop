import { NextRequest, NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const todos = store.getAll();
  return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title } = body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const todo = store.create(title.trim());
  return NextResponse.json(todo, { status: 201 });
}
