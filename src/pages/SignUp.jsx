import React, { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { CustomButton } from '../components/common/Button'
import { CustomTextField } from '../components/common/CustomTextField';
const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [email, setEmail] = useState('');
    const location = useLocation();
    const message = location.state?.message;

    const handleSignup = async (e) => {        
        e.preventDefault();
        try {
            // signup(username, password);
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }} component="form" onSubmit={handleLogin}>
            <Typography variant="h5" color='textPrimary'>Sign Up</Typography>
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

            <CustomTextField isPrimary={true} label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                onChange={(e) => e.target.value === password ? setValidPassword(true) : setValidPassword(false)}
                required={true}
                error={!validPassword}
                helperText="Should be same as password"
            />
        
            <CustomButton type="submit" isPrimary={true} fullWidth sx={{ marginBottom: 1 }}>
                Login
            </CustomButton>
            <Link href="#">Need an account? SIGN UP</Link>
        </Box>
    );
};

export default SignUp;
