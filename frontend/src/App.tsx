// App.tsx

import { Routes, Route } from "react-router-dom"; // Routes + Route: decides which page component to show based on the URL

// Full-page components that match URLs ("/", "/canvas/:id")
import { DashboardPage } from "./pages/DashboardPage"; 
import { CanvasPage } from "./pages/CanvasPage";
// later: LoginPage, RegisterPage, etc

export default function App() {
  return (
    <>
       {/* Page switcher: chooses one <Route> based on the current URL */}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/canvas/:id" element={<CanvasPage />} />
      </Routes>
    </>
  );
}


