import React, { useEffect, useState, useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { useAuth } from '../context/AuthContext';
import { getExchangeRates } from '../services/apiService';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'

const Dashboard = () => {
    const [exchangeRates, setExchangeRates] = useState({
        base: 'EUR',
        rates: {},
    });
    const apiRef = useGridApiRef();
    const autosizeOptions = {
        includeHeaders: true,
        includeOutliers: true,
        outliersFactor: 10,
        expand: true,
    };
    useEffect(() => {
        getExchangeRates()
            .then((response) => {
                console.log(response.data);
                setExchangeRates(response.data);
                apiRef.current.autosizeColumns(autosizeOptions)
                apiRef.current.setPageSize(25);
            })
            .catch((error) => {
                console.error('Error fetching exchange rates:', error);
            });
    }, [getExchangeRates]);

    const columns = useMemo(() => [
        { field: 'currency', headerName: 'Currency', sortable: true },
        { field: 'rate', headerName: `Rate (${exchangeRates?.base})`, sortable: true },
    ], [exchangeRates?.base]);
    const rows = Object.entries(exchangeRates?.rates).map(([currency, rate], index) => ({ id: index, currency, rate }))
    

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid size={12}>
                    <Typography variant="h4" gutterBottom>
                        Dashboard
                    </Typography>
                </Grid>
                <Grid size={12} columns={1} spacing={0.5}>
                    <Grid size={4}>
                        <Typography variant="subtitle1">
                            Exchange Rates
                        </Typography>
                    </Grid>
                    <Grid size={4}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            density="compact"
                            apiRef={apiRef}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
