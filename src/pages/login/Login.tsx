import React from "react";
import "./Login.scss";
import LoginComponent from "../../components/LoginComponent/LoginComponent";

const Login: React.FC = () => {
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
        <div className="sectionRight">
          <LoginComponent />
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
