import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomButton } from '../components/common/Button'
import { CustomTextField } from '../components/common/CustomTextField';
import { changePassword } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const ChangePassword = () => {
    const { authState } = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [email, setEmail] = useState(authState.user?.emailAddress || '');
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state?.message;

    const handleSignup = async (e) => {        
        e.preventDefault();
        try {
            changePassword(
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    emailAddress: email
                }
            ).then((response) => {
                toast.success("Password changed successfully.");
                navigate("/login");
            }).catch((error) => {
                console.log("Error Change Password", error);
                toast.error(error.response.data.detail || "Change Password failed. Please try again.");
            });
        } catch (error) {
            console.error('Change Password failed', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }} component="form" onSubmit={handleSignup}>
            <Typography variant="h5" color='textPrimary'>Change Password</Typography>
            {message && <Typography color="error">{message}</Typography>}
            <CustomTextField isPrimary={true} label="Old Password"
                type="password"
                fullWidth
                margin="normal"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required={true}
            />
            <CustomTextField isPrimary={true} label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required={true}
            />

            <CustomTextField isPrimary={true} label="Confirm New Password"
                type="password"
                fullWidth
                margin="normal"
                onChange={(e) => {
                    if (e.target.value === newPassword || e.target.value === '' || newPassword === '') {
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
                Change Password
            </CustomButton>
        </Box>
    );
};

export default ChangePassword;
