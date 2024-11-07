import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './Home.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import TaskList from '../../components/TaskList/TaskList';
import { useApiResponseContext } from "../../hooks/ApiResponseContext";

const Home: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [activeSection, setActiveSection] = useState("inicio"); // Estado de selección

    const { apiResponses, fetchApiData } = useApiResponseContext();

    const user = apiResponses.login?.data.id_rol;

    useEffect(() => {
        if (user === 2) {
            console.log("INGRESO USE EFFECT **");
    
            fetch("http://localhost:3001/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la respuesta de la API");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Datos recibidos:", data);
                fetchApiData("users", () => data);
            })
            .catch((error) => {
                console.error("Error al obtener los datos:", error);
            });
        }
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return (
        <div className="home-container">
            <Header />
            <div className="contentContainer">
                <Sidebar setActiveSection={setActiveSection} /> {/* Pasamos el setter */}
                <TaskList activeSection={activeSection} /> {/* Pasamos el estado */}
            </div>
        </div>
    );
}

export default Home;
