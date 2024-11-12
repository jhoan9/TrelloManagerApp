import React from 'react';
import './Notifications.scss';
import { useApiResponseContext } from '../../hooks/ApiResponseContext';
import { FaBell } from 'react-icons/fa';

const Notifications: React.FC = () => {
    const { apiResponses } = useApiResponseContext();
    const notificaciones = apiResponses.notifications?.data;

    return (
        <div className='notifications-container'>
            {notificaciones && notificaciones.length > 0 ? (
                notificaciones.map((notificacion: any) => (
                    <div key={notificacion.id_notificacion} className='card-notification'>
                        <div className="notification-icon">
                            <FaBell />
                        </div>
                        <div className="notification-content">
                            <p className="notification-description">{notificacion.descripcion_notificacion}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay notificaciones</p>
            )}
        </div>
    );
};

export default Notifications;
