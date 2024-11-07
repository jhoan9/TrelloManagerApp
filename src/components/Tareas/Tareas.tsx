import React, { useEffect, useState } from "react";
import "./Tareas.scss";
import { useApiResponseContext } from "../../hooks/ApiResponseContext";

interface Tarea {
    id_tarea: number;
    titulo_tarea: string;
    descripcion_tarea: string;
    id_prioridad: string;
    id_usuario: string;
    id_estado: string;
}

const Tareas: React.FC = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [showCrearModal, setShowCrearModal] = useState(false);
    const [showDetalleModal, setShowDetalleModal] = useState(false);
    const [tareaDetalle, setTareaDetalle] = useState<Tarea | null>(null);

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [prioridad, setPrioridad] = useState("NULL");
    const [usuario, setUsuario] = useState("NULL");
    const [estado, setEstado] = useState("NULL");

    const { apiResponses } = useApiResponseContext();
    const users = apiResponses.users?.data;

    const prioridades = [
        { id: "1", titulo: "Alta" },
        { id: "2", titulo: "Media" },
        { id: "3", titulo: "Baja" }
    ];

    const estados = [
        { id: "1", titulo: "Pendiente" },
        { id: "2", titulo: "En Proceso" },
        { id: "3", titulo: "Completada" }
    ];

    const getPrioridadTitulo = (id: string) => {
        return prioridades.find((prioridad) => prioridad.id === id)?.titulo || "No asignado";
    };

    const getEstadoTitulo = (id: string) => {
        return estados.find((estado) => estado.id === id)?.titulo || "No asignado";
    };

    const getUsuarioNombre = (id: string) => {
        const usuarioEncontrado = users?.find((user: any) => user.id_usuario === id);
        return usuarioEncontrado ? usuarioEncontrado.nombre_usuario : "No asignado";
    };

    const getClassName = (value: string) => {
        return value === "No asignado" ? "no-asignado" : "asignado";
    };

    useEffect(() => {
        console.log("INGRESO USE EFFECT");
        fetch('http://localhost:3001/api/tareas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200)
                    setTareas(data.data);
            });
    }, []);

    const handleCrearTarea = () => {
        console.log("iNGRESO AGREGAR TAREA");

        if (titulo && descripcion) {
            const nuevaTarea: Tarea = {
                id_tarea: tareas.length ? tareas[tareas.length - 1].id_tarea + 1 : 1,
                titulo_tarea: titulo,
                descripcion_tarea: descripcion,
                id_prioridad: prioridad || "",
                id_usuario: usuario || "",
                id_estado: estado || "",
            };

            console.log(JSON.stringify({ nuevaTarea }));
            fetch('http://localhost:3001/api/crearTarea', {
                method: 'POST',
                body: JSON.stringify({ nuevaTarea }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
            setTareas([...tareas, nuevaTarea]);
            setShowCrearModal(false);
            setTitulo("");
            setDescripcion("");
            setPrioridad("");
            setUsuario("");
            setEstado("");
        }
    };

    const handleMostrarDetalle = (tarea: Tarea) => {
        setTareaDetalle(tarea);
        setShowDetalleModal(true);
    };

    return (
        <div className="tareas-container">
            <button className="btn-crear" onClick={() => setShowCrearModal(true)}>
                Crear Tarea
            </button>

            {showCrearModal && (
                <div className="modal-overlay" onClick={() => setShowCrearModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Crear Nueva Tarea</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Título</label>
                                <input
                                    type="text"
                                    placeholder="Título de la tarea"
                                    value={titulo}
                                    required
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    placeholder="Descripción detallada de la tarea"
                                    value={descripcion}
                                    required
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Prioridad</label>
                                <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                                    <option value="NULL">Selecciona una prioridad</option>
                                    <option value="1">Alta</option>
                                    <option value="2">Media</option>
                                    <option value="3">Baja</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Asignar a</label>
                                <select value={usuario} onChange={(e) => setUsuario(e.target.value)}>
                                    <option value="NULL">Selecciona un usuario</option>
                                    {users?.map((user: any) => (
                                        <option key={user.id_usuario} value={user.id_usuario}>
                                            {user.nombre_usuario}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Estado</label>
                                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                                    <option value="NULL">Selecciona un estado</option>
                                    <option value="1">Pendiente</option>
                                    <option value="2">En Proceso</option>
                                    <option value="3">Completada</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button className="btn-agregar" onClick={handleCrearTarea}>
                                Agregar Tarea
                            </button>
                            <button className="btn-cancelar" onClick={() => setShowCrearModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista de tareas creadas */}
            <div className="tareas-list">
                <h2>Tareas Creadas</h2>
                {tareas.length > 0 ? (
                    tareas.map((tarea) => (
                        <div
                            key={tarea.id_tarea}
                            className={`tarea-item ${tarea.id_estado}`}
                            onDoubleClick={() => handleMostrarDetalle(tarea)}
                        >
                            <h3>{tarea.titulo_tarea}</h3>
                            <p>
                                <strong>Prioridad:</strong>
                                <span className={getClassName(getPrioridadTitulo(tarea.id_prioridad))}>
                                        {getPrioridadTitulo(tarea.id_prioridad)}
                                </span>
                            </p>
                            <p>
                                <strong>Asignada a:</strong>
                                <span className={getClassName(getUsuarioNombre(tarea.id_usuario))}>
                                    {getUsuarioNombre(tarea.id_usuario)}
                                </span>
                            </p>
                            <p>
                                <strong>Estado:</strong>
                                <span className={getClassName(getEstadoTitulo(tarea.id_estado))}>
                                    {getEstadoTitulo(tarea.id_estado)}
                                </span>
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No hay tareas creadas.</p>
                )}
            </div>


            {showDetalleModal && tareaDetalle && (
                <div className="modal-overlay" onClick={() => setShowDetalleModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Detalles de la Tarea</h2>
                        <p><strong>Título:</strong> {tareaDetalle.titulo_tarea}</p>
                        <p><strong>Descripción:</strong> {tareaDetalle.descripcion_tarea}</p>
                        <p><strong>Prioridad:</strong> {getPrioridadTitulo(tareaDetalle.id_prioridad)}</p>
                        <p><strong>Usuario:</strong> {getUsuarioNombre(tareaDetalle.id_usuario)}</p>
                        <p><strong>Estado:</strong> {getEstadoTitulo(tareaDetalle.id_estado)}</p>
                        <button onClick={() => setShowDetalleModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tareas;
