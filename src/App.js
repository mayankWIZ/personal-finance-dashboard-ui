import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CustomThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router> 
          <CustomThemeProvider>
            <AuthProvider>
                <Header />
                <AppRoutes />
            </AuthProvider>
          </CustomThemeProvider>
        </Router>
        </LocalizationProvider>
    );
};

export default App;
