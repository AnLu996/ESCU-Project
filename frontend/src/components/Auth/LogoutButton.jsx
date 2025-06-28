import { authService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const logout = () => {
    authService.logout();
    navigate("/login");
  };
  return <button onClick={logout}>Cerrar sesión</button>;
}