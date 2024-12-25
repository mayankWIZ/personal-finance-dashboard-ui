import React from 'react';
import { Navigate, Outlet  } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ scopes }) => {
    const { isLoggedIn } = useAuth();
    
    return <Outlet />;
};

export default ProtectedRoute;