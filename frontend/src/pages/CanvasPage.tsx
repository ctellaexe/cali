// CanvasPage.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Canvas } from "../types/canvas";
import { loadCanvases } from "../utils/storage";

import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export function CanvasPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [canvas, setCanvas] = useState<Canvas | null>(null);

  useEffect(() => {
    if (!id) return;
    const list = loadCanvases();
    const found = list.find((c) => c.id === id) || null;
    setCanvas(found);
  }, [id]);

  if (!canvas) {
    return <div style={{ padding: "20px" }}></div>;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          height: "50px",
          background: "#222",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 15px",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: "1px solid #555",
            color: "white",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          {canvas.name}
        </div>

        <div style={{ width: "60px" }}></div>
      </div>

      {/* FULLSCREEN EXCALIDRAW */}
      <div
        className="excalidraw-sandbox"
        style={{
          height: "calc(100vh - 50px)",
          position: "relative",
        }}
      >
        <Excalidraw theme="dark" />  {/* <-- always dark mode */}
      </div>
    </div>
  );
}
