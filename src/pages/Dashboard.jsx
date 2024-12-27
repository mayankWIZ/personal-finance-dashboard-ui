import React, { useEffect, useState, useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { getExchangeRates, getTransactions } from '../services/apiService';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid'
import { BarChartComponent } from '../components/common/BarChartComponent';
import './Dashboard.css'
const Dashboard = () => {
    const [exchangeRates, setExchangeRates] = useState({
        base: 'EUR',
        rates: {},
    });
    const [transactions, setTransactions] = useState([]);
    const [totalSavings,setTotalSavings] = useState([]);

    const apiRef = useGridApiRef();
    const autosizeOptions = useMemo(
        () => {
            return {
                includeHeaders: true,
                includeOutliers: true,
                outliersFactor: 10,
                expand: true,
            }
        },
        []
    )

    useEffect(() => {
        getTransactions().then((response)=>{
            console.log("Transactions",response.data);
            setTransactions(response.data);
            const transformedData = Object.entries(response.data?.totalSavings).map(([date, savings]) => ({
                date,
                savings
              }));
              setTotalSavings(transformedData);
        }).catch((error)=>{
            console.log("Error while fetching transactions",error);
        })
    },[])
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
    }, [apiRef, autosizeOptions]);

    const columns = useMemo(() => [
        { field: 'currency', headerName: 'Currency', sortable: true },
        { field: 'rate', headerName: `Rate (${exchangeRates?.base})`, sortable: true },
    ], [exchangeRates?.base]);
    const rows = Object.entries(exchangeRates?.rates).map(([currency, rate], index) => ({ id: index, currency, rate }))


    return (
        <div className='widget-container'>
            <div className='widget'>
                <div className='header'>Total Savings</div>
                <div className='graph'>
                 <BarChartComponent data={totalSavings} />
                </div>
                    
            </div>
        </div>
 
    );
};

export default Dashboard;
