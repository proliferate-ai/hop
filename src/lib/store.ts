// In-memory store - data resets on cold start (fine for demo)

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  completedAt: Date | null;
}

// Simple ID generator
let idCounter = 0;
function generateId(): string {
  return `todo_${Date.now()}_${++idCounter}`;
}

// In-memory storage
const todos: Map<string, Todo> = new Map();

// Seed with some example todos
const seedTodos = [
  { title: "Buy groceries", completed: false },
  { title: "Walk the dog", completed: true },
  { title: "Finish project report", completed: false },
];

seedTodos.forEach((t) => {
  const id = generateId();
  todos.set(id, {
    id,
    title: t.title,
    completed: t.completed,
    createdAt: new Date(),
    completedAt: t.completed ? new Date() : null,
  });
});

// Store operations
export const store = {
  getAll(): Todo[] {
    return Array.from(todos.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },

  get(id: string): Todo | undefined {
    return todos.get(id);
  },

  create(title: string): Todo {
    const id = generateId();
    const todo: Todo = {
      id,
      title,
      completed: false,
      createdAt: new Date(),
      completedAt: null,
    };
    todos.set(id, todo);
    return todo;
  },

  update(id: string, data: { completed?: boolean; title?: string }): Todo | null {
    const todo = todos.get(id);
    if (!todo) return null;

    if (typeof data.completed === "boolean") {
      todo.completed = data.completed;
      todo.completedAt = data.completed ? new Date() : null;
    }
    if (typeof data.title === "string") {
      todo.title = data.title;
    }

    todos.set(id, todo);
    return todo;
  },

  delete(id: string): boolean {
    return todos.delete(id);
  },
};
