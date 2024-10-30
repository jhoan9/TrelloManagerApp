import React, { useState } from 'react';
import "./RegistroUsuario.scss";

interface User {
    username: string;
    email: string;
    password: string;
}

const RegistroUsuario: React.FC = () => {
    const [user, setUser] = useState<User>({ username: '', email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
        console.log(user);
    };

    return (
        <div className="registro-usuario">
            <h2 className="form-title">Registro de Usuario</h2>
            <div className='form-container'>
                <div className="form-group">
                    <label className="label-title">Nombre de Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label-title">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="label-title">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </div>
                <div className="form-actions">
                    <a href="/login">Cancelar</a>
                </div>
            </div>
        </div>
    );
};

export default RegistroUsuario;
