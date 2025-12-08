// id.ts

// Simple ID generator for now
// Later we can replace with nanoid or UUID

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}