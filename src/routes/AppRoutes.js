import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ChangePassword from '../pages/ChangePassword';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<ProtectedRoute needSignedIn={false} restrictIfSignedIn={true} />} >
                <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/signup" element={<ProtectedRoute needSignedIn={false} restrictIfSignedIn={false} />} >
                <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="/" element={<ProtectedRoute scopes={['me']} />} >
                <Route path="/" element={<Dashboard />} />
            </Route>
            <Route path="/change-password" element={<ProtectedRoute scopes={['me']} />} >
                <Route path="/change-password" element={<ChangePassword />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
