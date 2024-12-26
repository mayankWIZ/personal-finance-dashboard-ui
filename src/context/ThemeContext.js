import React, { createContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CustomContainer as Container } from '../components/common/CustomContainer';

export const ThemeContext = createContext();
export const useTheme = () => {
  return React.useContext(ThemeContext);
};

const themes = {
    dark: createTheme({
        palette: {
            mode: 'dark',
        },
    }),
    light: createTheme({
        palette: {
            mode: 'light',
        },
    }),
};

export const CustomThemeProvider = ({ children }) => {
    const [ mode, setMode ] = useState("light");
    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
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
