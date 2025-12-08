// storage.ts

import type { Canvas } from "../types/canvas";
import { generateId } from "./id";

const STORAGE_KEY = "cali_canvases";


// Turn whatever is in localStorage into an array of Canvas objects
export function loadCanvases(): Canvas[] {

    
  const raw = localStorage.getItem(STORAGE_KEY); // Look in localStorage for the key "cali_canvases"

  if (!raw) return []; // If nothing found --> return []


  try {
    const list = JSON.parse(raw); // If something found --> try to JSON.parse it
    return Array.isArray(list) ? list : []; // If parse works and it's an array --> return it
  } catch {
    return []; // If parse fails (corrupted data) --> return []

  }
}


// Store the current canvas list in localStorage, this function updates the tempoary "database" we got while testing without DB!
export function saveCanvases(list: Canvas[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Create a valid Canvas object with all required fields.
// This is what will be displayed in ALL sections of the dashboard
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


export function clearAllCanvases(): void {
  localStorage.removeItem("cali_canvases");
}

