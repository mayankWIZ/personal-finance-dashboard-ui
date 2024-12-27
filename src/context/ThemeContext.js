import React, { createContext, useState } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CustomContainer as Container } from '../components/common/CustomContainer';

export const ThemeContext = createContext();
export const useTheme = () => {
  return React.useContext(ThemeContext);
};

const themes = {
    dark: responsiveFontSizes(createTheme({
        palette: {
            mode: 'dark',
        },
    })),
    light: responsiveFontSizes(createTheme({
        palette: {
            mode: 'light',
        },
    })),
};

export const CustomThemeProvider = ({ children }) => {
    const [ mode, setMode ] = useState(localStorage.getItem("mode") ?? 'light');
    const toggleTheme = () => {
        let finalMode;
        setMode((prev) => {
            finalMode = prev === 'light' ? 'dark' : 'light';
            return finalMode;
        });
        localStorage.setItem("mode", finalMode);
    };

    return (
        <ThemeContext.Provider value={{ theme:themes[mode], toggleTheme, mode }}>
            <ThemeProvider theme={themes[mode]}>
                <Container>
                    {children}
                </Container>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
