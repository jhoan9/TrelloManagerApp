import React from 'react';
import Tareas from '../Tareas/Tareas';
import "./TaskList.scss";

import { useApiResponseContext } from "../../hooks/ApiResponseContext";


interface TaskListProps {
  activeSection: string;
}

const TaskList: React.FC<TaskListProps> = ({ activeSection }) => {

  const { apiResponses } = useApiResponseContext();

  const users  = apiResponses.users?.data;

  console.log(users);
  return (
    <div className="taskListContainer">
      {activeSection === "inicio" && <p>Contenido de Inicio</p>}
      {activeSection === "tareas" && <Tareas/>}
      {activeSection === "usuarios" && <p>Usuarios</p>}
      {activeSection === "notificaciones" && <p>Notificaciones Activas</p>}
    </div>
  );
};

export default TaskList;
