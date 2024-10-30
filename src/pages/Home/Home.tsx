import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { Navigate } from 'react-router-dom';

const Home:React.FC = () => {

    const { isAuthenticated } = useAuth();

   if(!isAuthenticated) {
       return <Navigate to="/login" />
    }

    if(!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <h1>Home, esto es aqui</h1>
        </div>
    );
}

export default Home;