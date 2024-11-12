import React from 'react';
import { useApiResponseContext } from "../../hooks/ApiResponseContext";
import { FaUserCircle } from 'react-icons/fa'; // Importamos un icono
import './Usuarios.scss';

const Usuarios: React.FC = () => {
    const { apiResponses } = useApiResponseContext();
    const usuarios = apiResponses.users?.data;

    return (
        <div className='usuarios-container'>
            {usuarios && usuarios.map((usuario: any) => (
                <div className='usuario-card' key={usuario.id_usuario}>
                    <div className="usuario-icon">
                        <FaUserCircle size={50} color="#3f51b5" />
                    </div>
                    <div className="usuario-details">
                        <p className='usuario-nombre'>{usuario.nombre_usuario} {usuario.apellido_usuario}</p>
                        <p className='usuario-info'>{usuario.correo_usuario}</p>
                        <p className='usuario-info'>{usuario.telefono_usuario}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Usuarios;
