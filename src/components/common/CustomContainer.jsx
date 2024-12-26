import { Box } from '@mui/material';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';


export const CustomContainer = (props) => {
    const { theme } = useTheme();
    return (
        <Box sx={{ bgcolor: theme.palette.background.default, height: '100vh', padding: 1 }} {...props}/>
    );
};