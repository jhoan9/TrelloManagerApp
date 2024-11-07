import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Login from '../pages/login/Login';
import { AuthProvider } from '../hooks/AuthProvider';
import { ApiResponseProvider } from '../hooks/ApiResponseContext';

const AppRoutes = () => {
    return (
        <AuthProvider>
            <ApiResponseProvider>
                <Router>
                    <Routes>
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Login />} />
                    </Routes>

                </Router>
            </ApiResponseProvider>
        </AuthProvider>
    )
};

export default AppRoutes;