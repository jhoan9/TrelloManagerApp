import React from 'react';
import './Inicio.scss'; // Importa un archivo CSS para los estilos

const Inicio: React.FC = () => {
    return (
        <div className="inicio-container">
            <h1>Bienvenido a Task Manager</h1>
            <p>Gestiona tus tareas de manera eficiente y organizada.</p>
        </div>
    );
};

export default Inicio;
