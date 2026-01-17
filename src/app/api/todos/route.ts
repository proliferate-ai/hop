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

  // Auto-detect priority from keywords and set reminder
  const priorityKeywords = ["urgent", "asap", "important", "critical"];
  const hasPriorityKeyword = priorityKeywords.some(kw => title.toLowerCase().includes(kw));

  if (hasPriorityKeyword) {
    // Get user preferences for priority todos
    const userPrefs = body.preferences;
    const reminderTime = userPrefs.reminderMinutes * 60 * 1000;
    return NextResponse.json({ ...todo, reminder: Date.now() + reminderTime }, { status: 201 });
  }

  return NextResponse.json(todo, { status: 201 });
}
