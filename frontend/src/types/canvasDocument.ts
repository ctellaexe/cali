// src/types/canvasDocument.ts

// Wrapper around the Excalidraw data
// Keeps it versioned + timestamped so we can evolve schema later
export type CanvasDocument = {
  version: number;    // schema version for this wrapper
  lastEdited: number; // ms since epoch, used for "last edited" display + conflict handling
  data: any;          // raw Excalidraw JSON (we'll type this properly later)
};
