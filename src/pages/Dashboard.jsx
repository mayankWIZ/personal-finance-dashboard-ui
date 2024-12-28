import React, { useEffect, useState, useMemo } from "react";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import {
  getExchangeRates,
  getTransactionDashboard,
} from "../services/apiService";
import { BarChartComponent } from "../components/common/BarChartComponent";
import { toast } from "react-toastify";
import { CustomDataGrid } from "../components/common/CustomDataGrid";
import { LineChartComponent } from "../components/common/LineChartComponent";
import { PieChartComponent } from "../components/common/PieChartComponent";
const Dashboard = () => {
  const [exchangeRates, setExchangeRates] = useState({
    base: "EUR",
    rates: {},
  });
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    getTransactionDashboard()
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        toast.error(
          error.response.data.detail ||
            "Error while fetching dashboard data. Please try again."
        );
      });
  }, []);
  useEffect(() => {
    getExchangeRates()
      .then((response) => {
        setExchangeRates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
      });
  }, []);

  const columns = useMemo(
    () => [
      { field: "currency", headerName: "Currency", sortable: true },
      {
        field: "rate",
        headerName: `Rate (USD)`,
        sortable: true,
      },
    ],
    [exchangeRates?.base]
  );
  const rows = Object.entries(exchangeRates?.rates).map(
    ([currency, rate], index) => ({ id: index, currency, rate })
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        margin: 2,
      }}
    >
      <Grid
        container
        spacing={2}
        columns={{ xs: 6, sm: 6, md: 12 }}
        justifyContent={"space-between"}
      >
        <Grid size={{ xs: 6, sm: 6, md: 12 }}>
          <Box>
            <Typography variant="h5" color="textPrimary">
              Dashboard
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 6, sm: 6, md: 6 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          container
          sx={{ border: "3px solid", borderColor: "text.secondary", borderRadius: 2, padding: 1 }}
        >
          <Grid size={12} justifyContent={"center"}>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="body1" color="textSecondary">
                Expense Trends
              </Typography>
            </Box>
          </Grid>
          <Grid size={12} sx={{ padding: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                minHeight: 280,
                minWidth: 280,
              }}
            >
              <LineChartComponent
                data={
                  dashboardData?.monthlyExpenses
                    ? Object.entries(dashboardData?.monthlyExpenses).map(
                        ([date, expenses]) => ({ date, expenses })
                      )
                    : []
                }
                title="Expense Trends"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 6, sm: 6, md: 6 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          container
          sx={{ border: "3px solid", borderColor: "text.secondary", borderRadius: 2, padding: 1 }}
        >
          <Grid size={12} justifyContent={"center"}>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="body1" color="textSecondary">
                Monthly Savings
              </Typography>
            </Box>
          </Grid>
          <Grid size={12} sx={{ padding: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                minHeight: 280,
                minWidth: 280,
              }}
            >
              <BarChartComponent
                data={
                  dashboardData?.totalSavings
                    ? Object.entries(dashboardData?.totalSavings).map(
                        ([date, savings]) => ({ date, savings })
                      )
                    : []
                }
                title="Total Savings"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 6, sm: 6, md: 6 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          container
          sx={{ border: "3px solid", borderColor: "text.secondary", borderRadius: 2, padding: 1 }}
        >
          <Grid size={12} justifyContent={"center"}>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="body1" color="textSecondary">
                Investments
              </Typography>
            </Box>
          </Grid>
          <Grid size={12} sx={{ padding: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                minHeight: 280,
                minWidth: 280,
              }}
            >
              <PieChartComponent
                data={
                  dashboardData?.investmentGrowth
                    ? Object.entries(dashboardData?.investmentGrowth).map(
                        ([category, investment]) => ({ category, investment: Math.abs(investment) })
                      )
                    : []
                }
                title="Investments"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 6, sm: 6, md: 6 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          container
          sx={{ border: "3px solid", borderColor: "text.secondary", borderRadius: 2, padding: 1 }}
        >
          <Grid size={12} justifyContent={"center"}>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="body1" color="textSecondary">
                Exchange Rates
              </Typography>
            </Box>
          </Grid>
          <Grid size={12} sx={{ padding: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                minHeight: 200,
                minWidth: 200,
              }}
            >
              <CustomDataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'rate', sort: 'desc' }],
                  },
                }}
                autoPageSize={true}
                disableColumnResize={true}
                filterMode="client"
                autosizeOptions={{
                    columns: ["currency", "rate"],
                    includeHeaders: true,
                    includeOutliers: true,
                    outliersFactor: 10,
                    expand: true,
                }}
                autosizeOnMount={true}
                rowHeight={30}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
