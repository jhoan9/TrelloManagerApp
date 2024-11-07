import React from "react";
import { useApiResponseContext } from "../../hooks/ApiResponseContext";
import "./Header.scss";

const Header: React.FC = () => {

  const { apiResponses } = useApiResponseContext();


  return (
    <header className="headerContainer">
      <h1 className="headerTitle">Trello Manager</h1>
      <div className="userInfo">
        <p>Bienvenido, {apiResponses.login?.data.nombre_usuario}</p>
        <span>Rol:  {apiResponses.login?.data.id_rol}</span>
      </div>
    </header>
  );
};

export default Header;
