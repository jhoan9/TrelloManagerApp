import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Login from '../pages/login/Login';
import RegistroUsuario from '../pages/RegistroUsuario/RegistroUsuario';
import { AuthProvider } from '../hooks/AuthProvider';

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<RegistroUsuario />} />
                    <Route path="*" element={<div><h1>Not Found</h1></div>} />
                </Routes>

            </Router>
        </AuthProvider>
    )
};

export default AppRoutes;