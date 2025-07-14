import { Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import DenunciaPage from "../pages/DenunciaPage";
import AdminDashboard from "../pages/admin";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/denuncia" element={<DenunciaPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
} 