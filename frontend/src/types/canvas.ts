// canvas.ts
export type Canvas = {
  id: string;        // unique id used in URL and storage
  name: string;      // display name for the canvas
  createdAt: number; // when it was created (ms since epoch)
  pinned: boolean;   // whether it’s pinned on the dashboard
  owner: string;     // username: for now just "me"
  shared: string; // empty for now, future other usernames!
};

