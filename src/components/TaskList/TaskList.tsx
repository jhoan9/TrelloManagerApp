import React from 'react';
import Tareas from '../Tareas/Tareas';
import "./TaskList.scss";
import Notifications from '../Notifications/Notifications'; 

import { useApiResponseContext } from "../../hooks/ApiResponseContext";
import Usuarios from '../Usuarios/Usuarios';
import Inicio from '../Inicio/Inicio';


interface TaskListProps {
  activeSection: string;
}

const TaskList: React.FC<TaskListProps> = ({ activeSection }) => {

  const { apiResponses } = useApiResponseContext();

  const notificaciones = apiResponses.notifications?.data;

  console.log(notificaciones);
  return (
    <div className="taskListContainer">
      {activeSection === "inicio" && <Inicio/>}
      {activeSection === "tareas" && <Tareas/>}
      {activeSection === "usuarios" && <Usuarios/>}
      {activeSection === "notificaciones" && <Notifications/>}
    </div>
  );
};

export default TaskList;
