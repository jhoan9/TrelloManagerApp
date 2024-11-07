import React, { useState } from "react";
import "./Sidebar.scss";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

interface SidebarProps {
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [hasNotifications, setHasNotifications] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNotificationsClick = () => {
    setHasNotifications(false);
    setActiveSection("notificaciones"); // Cambiar sección activa
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <ul className="menu">
          <li className="menu-item" onClick={() => setActiveSection("inicio")}>Inicio</li>
          <li className="menu-item" onClick={() => setActiveSection("tareas")}>Tareas</li>
          <li className="menu-item" onClick={() => setActiveSection("usuarios")}>Usuarios</li>
          <li className="menu-item notifications" onClick={handleNotificationsClick}>
            <FaBell className={`bell-icon ${hasNotifications ? "active" : ""}`} />
            Notificaciones
          </li>
        </ul>
      </div>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
