import { Routes, Route } from "react-router-dom";
import Hazard from "./pages/Hazard";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

function App() {
  return (
    <Routes>
      {/* Halaman utama */}
      <Route path="/" element={<Hazard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/hazard-reports" element={<Reports />} />
    </Routes>
  );
}

export default App;
