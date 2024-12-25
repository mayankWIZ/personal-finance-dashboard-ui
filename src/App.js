import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { CustomThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';

const App = () => {
    return (
        <Router>
          <CustomThemeProvider>
            <AuthProvider>
                <Header />
                <AppRoutes />
            </AuthProvider>
          </CustomThemeProvider>
        </Router>
    );
};

export default App;
