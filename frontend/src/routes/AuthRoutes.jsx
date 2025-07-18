import { Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ChatbotPage from "../pages/ChatBotPage";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
    </Routes>
  );
} 