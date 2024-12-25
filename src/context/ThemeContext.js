import React, { createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '../components/common/Container';

export const ThemeContext = createContext();

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#6200EE' },
        secondary: { main: '#03DAC6' },
        background: { default: '#f5f5f5' },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#BB86FC' },
        secondary: { main: '#03DAC6' },
        background: { default: '#333' },
    },
});

export const CustomThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const themeConfig = theme === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, themeConfig }}>
            <ThemeProvider theme={themeConfig}>
                <Container>
                    {children}
                </Container>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
