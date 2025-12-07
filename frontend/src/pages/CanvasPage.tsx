import { useParams } from "react-router-dom";

export function CanvasPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Canvas: {id}</h1>
      <p>This is where the Excalidraw canvas will live.</p>
    </div>
  );
}
