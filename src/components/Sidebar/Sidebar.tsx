import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { useAuth } from "../../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useApiResponseContext } from "../../hooks/ApiResponseContext";

interface SidebarProps {
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveSection }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [hasNotifications, setHasNotifications] = useState(false);

  const { apiResponses, clearApiResponses, fetchApiData } = useApiResponseContext();
  const id_user = apiResponses.login?.data.id_usuario;
  const id_rol = apiResponses.login?.data.id_rol;

  const handleLogout = () => {
    logout();
    clearApiResponses();  
    navigate("/login");
  };

  const handleNotificationsClick = () => {
    setHasNotifications(false);
    setActiveSection("notificaciones");
    fetch(`http://localhost:3001/api/updateNotificar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_usuario: id_user }),
    }).then((response) => response.json()).then((data) => {
      if (data && data.code === 200) {
        console.log("Notificaciones actualizadas");
      }
    }
    )
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`http://localhost:3001/api/notificaciones/${id_user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.code === 200) {
          const notifications = data.data.length;
          if (notifications > 0 && data.data[notifications - 1].habilitar_notificacion === 1) {
            fetchApiData("notifications", () => data.data);
            setHasNotifications(true);
          } else {
            setHasNotifications(false);
          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener las notificaciones:", error);
      });
    }, 2000); // 10000 milisegundos = 10 segundos
  
    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);
  

return (
  <aside className="sidebar">
    <div className="sidebar-content">
      <ul className="menu">
        <li className="menu-item" onClick={() => setActiveSection("inicio")}>Inicio</li>
        <li className="menu-item" onClick={() => setActiveSection("tareas")}>Tareas</li>
        {id_rol == 1 ? <li className="menu-item" onClick={() => setActiveSection("usuarios")}>Usuarios</li> : "" }
        <li className="menu-item notifications" onClick={handleNotificationsClick}>
          <FaBell className={`bell-icon ${hasNotifications ? "active" : ""}`} /> Notificaciones
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
