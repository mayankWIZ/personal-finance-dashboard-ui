import React from 'react';
import { Navigate, Outlet  } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ scopes, needSignedIn = true, restrictIfSignedIn = false }) => {
    const { authState, hasScopes } = useAuth();
    return (
        (needSignedIn && authState.isLoggedIn && hasScopes(scopes)) || (restrictIfSignedIn && !authState.isLoggedIn) || (
            !needSignedIn && !restrictIfSignedIn
        ) ? (
            <Outlet />
        ):(
            restrictIfSignedIn && authState.isLoggedIn ? (
                <Navigate to="/"/>
            ) : (
                <Navigate to="/login"/>
            )
        )
    );
};

export default ProtectedRoute;
