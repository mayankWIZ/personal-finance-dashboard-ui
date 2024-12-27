import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './components/common/Header';
import { AuthProvider } from './context/AuthContext';
import { CustomThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
    return (
      <div>
        <ToastContainer transition={Slide} limit={5} autoClose={1000} />
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
      </div>
    );
};

export default App;
