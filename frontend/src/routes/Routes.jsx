import { Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import DenunciaPage from "../pages/DenunciaPage";
import AdminDashboard from "../pages/AdminPage";
import UserProfile from "../pages/ProfilePage";
import ChatBotPage from "../pages/ChatBotPage";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/denuncia" element={<DenunciaPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/chatbot" element={<ChatBotPage />} />
    </Routes>
  );
} 