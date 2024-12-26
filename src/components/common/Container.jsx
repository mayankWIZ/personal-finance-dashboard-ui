import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext';

const Container = ({ children }) => {
    const { themeConfig } = useContext(ThemeContext);
    
    return (
        <Box sx={{ p: 2, backgroundColor: themeConfig?.palette?.background?.default }}>
            <div style={{height: "95vh"}}>
                {children}
            </div>
        </Box>
    );
};

export default Container;