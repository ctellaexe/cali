import { Routes, Route } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { DashboardPage } from "./pages/DashboardPage";
import { CanvasPage } from "./pages/CanvasPage";
// later: LoginPage, RegisterPage, etc

export default function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/canvas/:id" element={<CanvasPage />} />
      </Routes>
    </>
  );
}


