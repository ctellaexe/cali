import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Canvas } from "../types/canvas";

import { CanvasCard } from "../components/CanvasCard";
import {
  loadCanvases,
  saveCanvases,
  createCanvasObject,
  clearAllCanvases,
} from "../utils/storage";

export function DashboardPage() {
  const username = "amms";

  const [newName, setNewName] = useState("");
  const [canvases, setCanvases] = useState<Canvas[]>([]);

  const navigate = useNavigate();

  // Load canvases on mount
  useEffect(() => {
    const list = loadCanvases();
    setCanvases(list);
  }, []);

  // Create new canvas
  function handleCreate() {
    const name = newName.trim();
    const newCanvas = createCanvasObject(name);

    const updated = [...canvases, newCanvas];
    setCanvases(updated);
    saveCanvases(updated);

    setNewName("");
    navigate("/canvas/" + encodeURIComponent(newCanvas.id));
  }

  function handleDelete(id: string) {
    const updated = canvases.filter((c) => c.id !== id);
    setCanvases(updated);
    saveCanvases(updated);
  }

  function handleRename(id: string) {
    const current = canvases.find((c) => c.id === id);
    const initial = current?.name ?? "";

    const next = window.prompt("New name:", initial);
    if (next == null) return; // cancel
    const trimmed = next.trim();
    if (!trimmed) return; // ignore empty

    const updated = canvases.map((c) =>
      c.id === id ? { ...c, name: trimmed } : c
    );

    setCanvases(updated);
    saveCanvases(updated);
  }

  function handlePinToggle(id: string) {
    const updated = canvases.map((c) =>
      c.id === id ? { ...c, pinned: !c.pinned } : c
    );

    setCanvases(updated);
    saveCanvases(updated);
  }

  // Split lists
  const pinned = canvases.filter((c) => c.pinned);
  const owned = canvases.filter((c) => !c.pinned);
  const shared: Canvas[] = []; // shared not implemented yet

  return (
    <div className="section">
      <div className="container">
        {/* HEADER */}
        <div className="columns is-vcentered mb-5">
          <div className="column is-one-third-tablet has-text-centered-touch has-text-left-desktop">
            <h1 className="title">Canvas Dashboard</h1>
          </div>

          <div className="column is-one-third-tablet has-text-centered">
            <code
              className="is-capitalized"
              style={{
                fontSize: "1.4rem",
                padding: "4px 10px",
                background: "#222",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              {username}
            </code>
          </div>

          <div className="column is-one-third-tablet has-text-centered-touch has-text-right-desktop">
            <div
              className="is-flex is-align-items-center is-justify-content-center is-justify-content-flex-end-desktop"
              style={{ gap: "12px" }}
            >
              <button className="button is-info is-light">
                Change Password
              </button>
              <button className="button is-danger is-light">Logout</button>

              <button
                className="button is-danger"
                onClick={() => {
                  clearAllCanvases();
                  setCanvases([]); // clear UI instantly
                }}
              >
                Reset LocalStorage (Dev Only)
              </button>
            </div>
          </div>
        </div>

        {/* CREATE FORM */}
        <div className="columns">
          <div className="column">
            <div
              className="card is-shadowless"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <div className="card-content">
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input"
                      placeholder="Name (optional)"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleCreate();
                        }
                      }}
                    />
                  </div>

                  <div className="control">
                    <button className="button is-link" onClick={handleCreate}>
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PINNED */}
        <div className="columns pb-6">
          <div className="column">
            <h2 className="title has-text-centered">Pinned</h2>

            {pinned.length === 0 && (
              <p className="has-text-grey has-text-centered">
                No pinned canvases.
              </p>
            )}

            <div className="columns is-multiline is-centered">
              {pinned.map((canvas) => (
                <CanvasCard
                  key={canvas.id}
                  id={canvas.id}
                  title={canvas.name}
                  isPinned={true}
                  onRename={() => handleRename(canvas.id)}
                  onDelete={() => handleDelete(canvas.id)}
                  onPinToggle={() => handlePinToggle(canvas.id)}
                />
              ))}
            </div>

            <hr />

            {/* OWNED */}
            <h2 className="title has-text-centered">Your Canvases</h2>

            {owned.length === 0 && (
              <p className="has-text-grey has-text-centered">
                No canvases yet.
              </p>
            )}

            <div className="columns is-multiline is-centered">
              {owned.map((canvas) => (
                <CanvasCard
                  key={canvas.id}
                  id={canvas.id}
                  title={canvas.name}
                  isPinned={canvas.pinned}
                  onRename={() => handleRename(canvas.id)}
                  onDelete={() => handleDelete(canvas.id)}
                  onPinToggle={() => handlePinToggle(canvas.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* SHARED */}
        <div className="columns">
          <div className="column">
            <h2 className="title has-text-centered">Shared With You</h2>

            {shared.length === 0 && (
              <p className="has-text-grey has-text-centered">
                Nothing shared with you yet.
              </p>
            )}

            <div className="columns is-multiline is-centered">
              {shared.map((canvas) => (
                <CanvasCard
                  key={canvas.id}
                  id={canvas.id}
                  title={canvas.name}
                  isShared={true}
                  owner={canvas.owner}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
