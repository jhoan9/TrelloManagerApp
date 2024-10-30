import React, { useState } from 'react';
import './LoginComponent.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';

const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, logout} = useAuth();
    const navigate = useNavigate();

    logout();

    const handleSubmit = () => {
        console.log('Email:', email);
        console.log('Password:', password);
        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo: email, clave: password })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response:', data);
                if(data.code === 200) {
                    console.log('Inicio de sesión exitoso');
                    login();
                    navigate('/dashboard', { replace: true });
                }
            });
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2 className='title-login'>Iniciar Sesión</h2>
                <div className="form-group">
                    <input
                        className='input-type text'
                        type="email"
                        id="email"
                        value={email}
                        placeholder=' '
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="email" className="floating-label">Email</label>
                </div>
                <div className="form-group">
                    <input
                        className='input-type text'
                        type="password"
                        id="password"
                        value={password}
                        placeholder=' '
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className="floating-label">Password</label>
                </div>


                <div className="form-group">
                    <button className='input-type btn' type="submit" onClick={() => handleSubmit()}>Entrar</button>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;