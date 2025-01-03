import React, { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomButton } from '../components/common/Button'
import { CustomTextField } from '../components/common/CustomTextField';
import { signup } from '../services/apiService';

const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [email, setEmail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state?.message;

    const handleSignup = async (e) => {        
        e.preventDefault();
        try {
            signup(
                {
                    fullName: fullName,
                    username: username,
                    password: password,
                    emailAddress: email
                }
            ).then((response) => {
                toast.success("Signup successful.");
                navigate("/login");
            }).catch((error) => {
                console.log("Error Signup", error);
                toast.error(error.response.data.detail || "Signup failed. Please try again.");
            });
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }} component="form" onSubmit={handleSignup}>
            <Typography variant="h5" color='textPrimary'>Sign Up</Typography>
            {message && <Typography color="error">{message}</Typography>}
            <CustomTextField isPrimary={true} label="Full Name"
                fullWidth
                margin="normal"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={true}
            />

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
                onChange={(e) => {
                    if (e.target.value === password || e.target.value === '' || password === '') {
                        setValidPassword(true);
                    } else {
                        setValidPassword(false);
                    }
                }}
                required={true}
                error={!validPassword}
                helperText={!validPassword ? 'Passwords do not match' : ''}
            />

            <CustomTextField isPrimary={true} label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                type="email"
            />
        
            <CustomButton type="submit" isPrimary={true} fullWidth sx={{ marginBottom: 1 }}>
                Sign Up
            </CustomButton>
            <Link href="/login">Already have an account?</Link>
        </Box>
    );
};

export default SignUp;
