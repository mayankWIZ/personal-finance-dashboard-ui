import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const location = useLocation();
    const message = location.state?.message;

    const handleLogin = async () => {
        try {
            login(username, password);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
            <Typography variant="h5">Login</Typography>
            {message && <Typography color="error">{message}</Typography>}
            <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
};

export default Login;
