export function DashboardPage() {
  return (
    <div>
      <h1>Welcome to Cali</h1>
      <div className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile has-text-centered">
        <div className="card">
          <div className="card-content is-clipped">
            <p className="is-size-4 has-text-weight-bold pb-3"></p>

            <div className="buttons">
              <button className="button is-primary is-fullwidth">Open</button>
            </div>

            <div className="is-flex is-justify-content-space-between">
              <button className="button is-warning is-flex-grow-1">
                Rename
              </button>

              <button className="button is-danger is-outlined ml-2">
                Delete
              </button>
            </div>

            {/* ACTION BAR */}
            <div
              className="mt-3 is-flex is-justify-content-space-between is-align-items-center"
              style={{
                width: "100%",
                flexWrap: "nowrap",
              }}
            >
              {/* RIGHT: Share + Unshare */}
              <div
                className="is-flex"
                style={{
                  gap: "6px",
                  flexShrink: 0,
                }}
              >
                <button
                  className="button is-small is-link is-light"
                  style={{ flexShrink: 0 }}
                >
                  Share
                </button>

                <button
                  className="button is-small is-light is-danger"
                  style={{ flexShrink: 0 }}
                >
                  Unshare
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
