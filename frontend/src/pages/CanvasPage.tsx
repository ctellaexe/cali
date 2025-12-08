import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Canvas } from "../types/canvas";
import { loadCanvases } from "../utils/storage";

export function CanvasPage() {
  const { id } = useParams<{ id: string }>();

  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (!id) return;

    const list = loadCanvases();
    const found = list.find((c) => c.id === id);

    setCanvas(found || null);
  }, [id]);

  if (!canvas) {
    return (
      <div className="section">
        <div className="container">
          <p className="title has-text-danger">Canvas not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">

        {/* NAME DISPLAY */}
        <h1 className="title">{canvas.name}</h1>

        <p className="has-text-grey">
          Canvas ID: <code>{canvas.id}</code>
        </p>

        {/* Here is where Excalidraw will eventually mount */}
        <div className="box mt-5">
          <p>Canvas editor will go here.</p>
        </div>

      </div>
    </div>
  );
}
