import { useState } from "react";
import { authService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authService.register(form);
    if (res.success) {
      navigate("/login");
    } else {
      alert("Error al registrarse");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
      <button type="submit">Registrarse</button>
    </form>
  );
}