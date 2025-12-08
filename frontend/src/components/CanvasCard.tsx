// CanvasCard.tsx

import { useNavigate } from "react-router-dom";

type CanvasCardProps = {
  id: string;
  title: string;
  isPinned?: boolean;
  isShared?: boolean;
  owner?: string;
  onRename?: () => void;
  onDelete?: () => void;
  onPinToggle?: () => void; // NEW
};
export function CanvasCard({ id, title, isPinned = false, isShared = false, owner, onRename, onDelete, onPinToggle }: CanvasCardProps) {

  const navigate = useNavigate();

  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile">
      <div className="card">
        <div className="card-content is-clipped">
          <p className="is-size-4 has-text-weight-bold pb-3">{title}</p>

          {/* OPEN */}
          <div className="buttons">
            <button
              className="button is-primary is-fullwidth"
              onClick={() => navigate("/canvas/" + encodeURIComponent(id))}
            >
              Open
            </button>
          </div>

          {/* RENAME + DELETE */}
          <div className="is-flex is-justify-content-space-between">
            <button
              className="button is-warning is-flex-grow-1"
              onClick={onRename}
            >
              Rename
            </button>

            <button
              className="button is-danger is-outlined ml-2"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>

          {/* ACTION BAR (pin + share UI only for now) */}
          <div
            className="mt-3 is-flex is-justify-content-space-between is-align-items-center"
            style={{ width: "100%", flexWrap: "nowrap" }}
          >
            {/* LEFT: Pin */}
            <button
              className={
                "button is-small" +
                (isPinned ? " has-text-warning" : " is-light")
              }
              title={isPinned ? "Unpin" : "Pin"}
              onClick={onPinToggle} // <--- NEW
              style={{
                flexShrink: 0,
                height: "28px",
                minHeight: "28px",
                borderColor: "transparent",
                outline: isPinned ? "2px solid gold" : "none",
                outlineOffset: "0",
                boxShadow: isPinned ? "0 0 6px rgba(255, 215, 0, 0.8)" : "none",
              }}
            >
              <span className="icon is-small">
                <i
                  className={
                    isPinned ? "fa-solid fa-star" : "fa-regular fa-star"
                  }
                ></i>
              </span>
            </button>

            {/* RIGHT: Share + Unshare (no logic yet) */}
            <div className="is-flex" style={{ gap: "6px", flexShrink: 0 }}>
              <button className="button is-small is-link is-light">
                Share
              </button>
              <button className="button is-small is-light is-danger">
                Unshare
              </button>
            </div>
          </div>

          {/* Owner label for shared cards */}
          {isShared && owner && (
            <p className="is-size-7 has-text-grey mt-3">Owner: {owner}</p>
          )}
        </div>
      </div>
    </div>
  );
}
