// storage.ts

import type { Canvas } from "../types/canvas";
import type { CanvasDocument } from "../types/canvasDocument";
import { generateId } from "./id";

// ---------------------------------------------
// CONSTANTS
// ---------------------------------------------

// Key for storing the array of canvas metadata used by the dashboard
const STORAGE_KEY = "cali_canvases";

// Prefix for storing the heavy Excalidraw JSON per canvas
// Example key: "cali_canvas_data_abcd1234"
const CANVAS_DATA_PREFIX = "cali_canvas_data_";

// ---------------------------------------------
// SECTION 1 — METADATA (Dashboard list)
// ---------------------------------------------

// Load the array of Canvas metadata from localStorage
export function loadCanvases(): Canvas[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

// Save the metadata list to localStorage
export function saveCanvases(list: Canvas[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Create a new Canvas metadata entry
export function createCanvasObject(name: string): Canvas {
  return {
    id: generateId(),
    name: name.trim() || "Untitled",
    createdAt: Date.now(),
    pinned: false,
    owner: "me",
    shared: "",
  };
}

// ---------------------------------------------
// SECTION 2 — CANVAS DOCUMENT (Excalidraw JSON)
// ---------------------------------------------

// Load the drawing for a canvas (wrapped in CanvasDocument)
// Returns null if missing or corrupted
export function loadCanvasData(id: string): CanvasDocument | null {
  const key = CANVAS_DATA_PREFIX + id;
  const raw = localStorage.getItem(key);

  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    // Validate structure of our wrapper
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.version === "number" &&
      typeof parsed.lastEdited === "number" &&
      "data" in parsed
    ) {
      return parsed as CanvasDocument;
    }

    return null; // structure mismatch
  } catch {
    return null; // corrupted JSON
  }
}

// Save drawing data (CanvasDocument wrapper)
export function saveCanvasData(id: string, doc: CanvasDocument): void {
  const key = CANVAS_DATA_PREFIX + id;
  localStorage.setItem(key, JSON.stringify(doc));
}

// Delete drawing data for a canvas
export function deleteCanvasData(id: string): void {
  const key = CANVAS_DATA_PREFIX + id;
  localStorage.removeItem(key);
}

// ---------------------------------------------
// SECTION 3 — UTILS
// ---------------------------------------------

// Clear *only metadata*, not drawing JSON
export function clearAllCanvases(): void {
  localStorage.removeItem(STORAGE_KEY);
}


