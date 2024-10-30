import React, { useState } from "react";
import "./LoginComponent.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

interface LoginComponentProps {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ setIsRegistering }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  logout();

  const handleSubmit = () => {
    // Verificar si los campos están vacíos
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo: email, clave: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la conexión con el servidor");
        }
        return response.json();
      })
      .then((data) => {
        if (data.code === 200) {
          login();
          navigate("/dashboard", { replace: true });
        } else if (data.code === 404) {
          setError("Usuario o contraseña incorrectos.");
        }
      })
      .catch((error) => {
        setError("No se pudo conectar al servidor. Inténtalo más tarde.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="title-login">Iniciar Sesión</h2>
        <div className="form-group">
          <input
            className='input-type text'
            type="email"
            id="email"
            value={email}
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email" className="floating-label">
            Email
          </label>
        </div>
        <div className="form-group">
          <input
            className="input-type text "
            type="password"
            id="password"
            value={password}
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password" className="floating-label">
            Password
          </label>
        </div>
        {/* Mensaje de error */}
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <button className="input-type btn" onClick={handleSubmit}>
            Entrar
          </button>
        </div>
        <p className="switch-mode">
          ¿No tienes una cuenta?{" "}
          <span onClick={() => setIsRegistering(true)}>Regístrate</span>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
