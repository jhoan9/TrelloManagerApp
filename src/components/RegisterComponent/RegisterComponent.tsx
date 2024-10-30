import React, { useState } from 'react';
import './RegisterComponent.scss';

interface RegisterComponentProps {
    setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
  }

const RegisterComponent: React.FC<RegisterComponentProps> = ({ setIsRegistering }) => {
  const [userData, setUserData] = useState({
    No_documento: '',
    Nombre: '',
    Apellido: '',
    Correo: '',
    Telefono: '',
    Clave: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleRegister = () => {
    for (let key in userData) {
      if (userData[key as keyof typeof userData].trim() === '') {
        setError(`Por favor, completa todos los campos. El campo "${key.replace('_', ' ')}" está vacío.`);
        return;
      }
    }

    if (isNaN(Number(userData.No_documento))) {
        setError(`El campo 'No documento' debe ser un número.`);
        return;
      }

    if (isNaN(Number(userData.Telefono))) {
        setError(`El campo 'Telefono' debe ser un número.`);
        return;
      }
  
      setError(null);
      console.log("Datos de Registro:", userData);
      fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error en la conexión con el servidor");
          }
          return response.json();
        })
        .then((data) => {
          if (data.code === 200) {
            console.log("Usuario registrado correctamente.");
            setIsRegistering(false);
          } else if (data.code === 400) {
            setError(data.message);
          }
        })
        .catch((error) => {
          setError("No se pudo conectar al servidor. Inténtalo más tarde.");
          console.error("Error:", error);
      })
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h2 className="title-register">Registro de Usuario</h2>
        {error && <p className="error-message">{error}</p>}
        {Object.keys(userData).map((key) => (
          <div className="form-group" key={key}>
            <input
              className={`input-type`}
              type={key === 'id_usuario' || key === 'telefono_usuario' ? 'number' : 'text'}
              name={key}
              value={userData[key as keyof typeof userData]}
              placeholder=" "
              onChange={handleChange}
              required
            />
            <label className="floating-label">{key.replace('_', ' ')}</label>
          </div>
        ))}
        <button className="btn" onClick={handleRegister}>Registrar</button>
        <p className="switch-mode">
          ¿Ya tienes una cuenta?{" "}
          <span onClick={() => setIsRegistering(false)}>Iniciar Sesión</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
