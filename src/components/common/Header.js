import React, { useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

const Header = () => {
    const { authState, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, backgroundColor: theme === 'light' ? '#f5f5f5' : '#333' }}>
            <Typography variant="h6">Welcome, {authState.user?.username || 'Guest'}</Typography>
            <Box>
                <Button onClick={toggleTheme} sx={{ mr: 1 }}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Button>
                {authState.token && (
                    <Button color="secondary" onClick={logout}>Logout</Button>
                )}
            </Box>
        </Box>
    );
};

export default Header;
