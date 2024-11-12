import React, { useState, useEffect } from "react";
import "./Login.scss";
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import RegisterComponent from "../../components/RegisterComponent/RegisterComponent";

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  // Esta función se ejecuta cuando el estado de isRegistering cambia
  useEffect(() => {
    if (isRegistering) {
      // Puedes agregar lógica aquí si es necesario, por ejemplo, restablecer campos
    }
  }, [isRegistering]);

  return (
    <div className="loginContainer">
      <header className="loginHeader">
        <div className="logo">
          <h1 className="titleApp">Trello Manager</h1>
        </div>
      </header>
      <main className="containerSection">
        <div className="sectionLeft">
          <div className="contentLeft">
            <h2>Gestiona tus tareas de forma sencilla</h2>
            <p>Con Trello Manager, organiza y visualiza tus tareas en un solo lugar. Perfecto para equipos y proyectos individuales.</p>
          </div>
        </div>
        <div className={`sectionRight ${isRegistering ? "rotate" : ""}`}>
          {isRegistering ? (
            <RegisterComponent setIsRegistering={setIsRegistering} />
          ) : (
            <LoginComponent setIsRegistering={setIsRegistering} />
          )}
        </div>
      </main>
      <footer className="loginFooter">
        <div className="copyrightContainer">
          <p className="copyRight">© 2024 Trello Manager</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
