import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';


export const CustomContainer = (props) => {
    const { theme } = useTheme();
    return (
        <Box sx={{ bgcolor: theme.palette.background.default, height: '100%', minHeight: '100vh', padding: 1 }} {...props}/>
    );
};
