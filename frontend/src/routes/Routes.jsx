import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../pages/HomePage';
import DenunciaPage from "../pages/DenunciaPage";
import AdminDashboard from "../pages/AdminPage";
import UserProfile from "../pages/ProfilePage";
import ChatBotPage from "../pages/ChatBotPage";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/" replace />;
}

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/denuncia"
        element={
          <PrivateRoute>
            <DenunciaPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-profile"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
      <Route path="/chatbot" element={<ChatBotPage />} />
    </Routes>
  );
}