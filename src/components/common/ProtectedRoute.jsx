import React from 'react';
import { Navigate, Outlet  } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ scopes }) => {
    const { authState, hasScopes } = useAuth();
    return authState.isLoggedIn && hasScopes(scopes) ? <Outlet />:<Navigate to="/login"/>;
};

export default ProtectedRoute;
