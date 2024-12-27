import React, { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { CustomButton } from '../components/common/Button'
import { CustomTextField } from '../components/common/CustomTextField';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const location = useLocation();
    const message = location.state?.message;

    const handleLogin = async (e) => {        
        e.preventDefault();
        try {
            login(username, password);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }} component="form" onSubmit={handleLogin}>
            <Typography variant="h5" color='textPrimary'>Login</Typography>
            {message && <Typography color="error">{message}</Typography>}

            <CustomTextField isPrimary={true} label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
            />
        
            <CustomTextField isPrimary={true} label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
            />
        
            <CustomButton type="submit" isPrimary={true} fullWidth sx={{ marginBottom: 1 }}>
                Login
            </CustomButton>
            <Link href="#">Need an account? SIGN UP</Link>
        </Box>
    );
};

export default Login;
