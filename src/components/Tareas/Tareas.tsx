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
    const [users, setUsers] = useState<any[]>([]);

    const { apiResponses } = useApiResponseContext();    
    const userRol = apiResponses.login?.data.id_rol;
    const idUser = apiResponses.login?.data.id_usuario;
    const nombre_usuario = apiResponses.login?.data.nombre_usuario;
    const admin = 111111;

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

    const getPrioridadTitulo = (id: string) => prioridades.find((prioridad) => prioridad.id == id)?.titulo || "No asignado";
    const getEstadoTitulo = (id: string) => estados.find((estado) => estado.id == id)?.titulo || "No asignado";
    const getUsuarioNombre = (id: string) => users?.find((user: any) => user.id_usuario == id)?.nombre_usuario || "No asignado";

    const getClassName = (value: string) => (value === "No asignado" ? "no-asignado" : "asignado");

    useEffect(() => {
        if (userRol === 1) {
            setUsers(apiResponses.users?.data);
            fetch('http://localhost:3001/api/tareas')
                .then((response) => response.json())
                .then((data) => {
                    if (data.code === 200) setTareas(data.data);
                });
        } else {
            setUsers(apiResponses.users?.data);
            fetch(`http://localhost:3001/api/tareas/${idUser}`).then((response) => response.json()).then((data) => {
                if (data.code === 200) setTareas(data.data);
            });
        }


    }, []);

    const resetForm = () => {
        setTitulo("");
        setDescripcion("");
        setPrioridad("NULL");
        setUsuario("NULL");
        setEstado("NULL");
    };

    const crearNotificacion = (id_usuario: number, descripcion: string) => {
        fetch('http://localhost:3001/api/notificar', {
            method: 'POST',
            body: JSON.stringify({ id_usuario, descripcion_notificacion: descripcion }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
            .then((response) => response.json())
            .then(() => {
                console.log("Notificación creada");
            });
    }


    const handleCrearTarea = () => {
        if (titulo && descripcion) {
            const nuevaTarea: Tarea = {
                id_tarea: tareas.length ? tareas[tareas.length - 1].id_tarea + 1 : 1,
                titulo_tarea: titulo,
                descripcion_tarea: descripcion,
                id_prioridad: prioridad || "",
                id_usuario: usuario || "",
                id_estado: estado || "",
            };

            fetch('http://localhost:3001/api/crearTarea', {
                method: 'POST',
                body: JSON.stringify(nuevaTarea),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            })
                .then((response) => response.json())
                .then(() => {
                    setTareas([...tareas, nuevaTarea]);
                    if(usuario !== null || usuario !== "") {
                        crearNotificacion(parseInt(usuario), `Se te ha asignado la tarea: ${titulo}`);
                    }
                    setShowCrearModal(false);
                    resetForm();
                });
        }
    };

    const handleMostrarDetalle = (tarea: Tarea) => {
        setTareaDetalle(tarea);
        setTitulo(tarea.titulo_tarea);
        setDescripcion(tarea.descripcion_tarea);
        setPrioridad(tarea.id_prioridad);
        setUsuario(tarea.id_usuario);
        setEstado(tarea.id_estado);
        setShowDetalleModal(true);
    };

    const updateTask = () => {
        if (tareaDetalle) {
            const updatedTaskParams: Tarea = {
                ...tareaDetalle,
                id_tarea: tareaDetalle.id_tarea,
                titulo_tarea: titulo,
                descripcion_tarea: descripcion,
                id_prioridad: prioridad,
                id_usuario: usuario,
                id_estado: estado,
            };

            console.log("aaaaa" + JSON.stringify(updatedTaskParams));

            fetch('http://localhost:3001/api/actualizarTarea', {
                method: 'PUT',
                body: JSON.stringify(updatedTaskParams),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            })
                .then((response) => response.json())
                .then(() => {
                    setTareas((prevTareas) =>
                        prevTareas.map((tarea) => (tarea.id_tarea === updatedTaskParams.id_tarea ? updatedTaskParams : tarea))
                    );
                    if(usuario !== null || usuario !== "" && parseInt(usuario) != admin) {
                        crearNotificacion(admin, `${nombre_usuario} ha modificado la tarea: ${titulo}`);
                    }
                    if(idUser == admin) {
                        crearNotificacion(parseInt(usuario), `${nombre_usuario} ha modificado la tarea: ${titulo}`);
                    }
                    setShowDetalleModal(false);
                    resetForm();
                });
        }
    };

    const handleCloseCrearModal = () => {
        setShowCrearModal(false);
        resetForm();
    };

    return (
        <div className="tareas-container">
            <button className="btn-crear" onClick={() => setShowCrearModal(true)}>
                Crear Tarea
            </button>

            {showCrearModal && (
                <div className="modal-overlay" onClick={handleCloseCrearModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Crear Nueva Tarea</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Título</label>
                                <input
                                    type="text"
                                    placeholder="Título de la tarea"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    placeholder="Descripción detallada de la tarea"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Prioridad</label>
                                <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                                    <option value="NULL">Selecciona una prioridad</option>
                                    {prioridades.map((prioridad) => (
                                        <option key={prioridad.id} value={prioridad.id}>
                                            {prioridad.titulo}
                                        </option>
                                    ))}
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
                                    {estados.map((estado) => (
                                        <option key={estado.id} value={estado.id}>
                                            {estado.titulo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button className="btn-agregar" onClick={handleCrearTarea}>
                                Agregar Tarea
                            </button>
                            <button className="btn-cancelar" onClick={handleCloseCrearModal}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                            <p><strong>Prioridad:</strong> {getPrioridadTitulo(tarea.id_prioridad)}</p>
                            <p><strong>Asignada a:</strong> {getUsuarioNombre(tarea.id_usuario)}</p>
                            <p><strong>Estado:</strong> {getEstadoTitulo(tarea.id_estado)}</p>
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
                        <div className="form-group">
                            <label>Título</label>
                            <input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Prioridad</label>
                            <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                                <option value="NULL">Selecciona una prioridad</option>
                                {prioridades.map((prioridad) => (
                                    <option key={prioridad.id} value={prioridad.id}>
                                        {prioridad.titulo}
                                    </option>
                                ))}
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
                                {estados.map((estado) => (
                                    <option key={estado.id} value={estado.id}>
                                        {estado.titulo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-buttons">
                            <button className="btn-actualizar" onClick={updateTask}>
                                Actualizar Tarea
                            </button>
                            <button className="btn-cancelar" onClick={() => setShowDetalleModal(false)}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tareas;
