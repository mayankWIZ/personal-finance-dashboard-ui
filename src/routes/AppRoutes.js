import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute scopes={['admin']} />} >
                <Route path="/" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
