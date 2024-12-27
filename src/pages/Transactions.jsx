import React, { useEffect, useState } from "react";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomDataGrid } from "../components/common/CustomDataGrid";
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from "../services/apiService";
import { toast } from "react-toastify";
import { CustomButton } from "../components/common/Button";
import { GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import { AddTransactionModel } from "../components/TransactionForm/AddTransactionModel";
import { dateTimeColumnType } from "../components/utils/dataGrid";
import dayjs from "dayjs";
import { useAuth } from "../context/AuthContext";

const columns = [
  {
    field: "transactionDate",
    headerName: "Transaction Date",
    ...dateTimeColumnType,
    valueGetter: (value) => value && dayjs(value),
    valueFormatter: (value) => value && dayjs(value).format("YYYY-MM-DD HH:mm:ss a"),
    editable: true,
    width: 230,
    align: "left"
  },
  {
    field: "transactionType",
    headerName: "Transaction Type",
    type: "singleSelect",
    valueOptions: ["income", "expense", "investment"].map((type) => ({
      value: type,
      label: type.toUpperCase()
    })),
    editable: true,
    align: "left"
  },
  {
    field: "category",
    headerName: "Category",
    type: "string",
    editable: true,
    align: "left"
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "string",
    editable: true,
    align: "left"
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    editable: true,
    align: "left"
  },
];

export const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [AddTransactionModelOpen, setAddTransactionModelOpen] = useState(false);
  const { hasScopes } = useAuth();
  const hasWriteAccess = hasScopes(["transaction_write"]);
  const apiRef = useGridApiRef();
  useEffect(() => {
    setLoading(true);
    getTransactions()
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        toast.error(
          error.response.data.detail ||
            "Error while getting users. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleTransactionCreate = ({ ...transaction }) => {
    setLoading(true);
    createTransaction(transaction).then((response) => {
      apiRef.current.updateRows([response.data]);
      toast.success("Transaction created successfully.");
      setAddTransactionModelOpen(false);
    }).catch((error) => {
      toast.error(
        error.response.data.detail ||
          "Error while creating transaction. Please try again."
      );
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleDeleteTransaction = (row) => {
    setLoading(true);
    deleteTransaction(row.id).then((response) => {
      apiRef.current.updateRows([{...row, _action: 'delete'}]);
      toast.success("Transaction deleted successfully.");
    }).catch((error) => {
      toast.error(
        error.response.data.detail ||
          "Error while deleting user. Please try again."
      );
    }).finally(() => {
      setLoading(false);
    });    
  };

  const handleEditTransaction = (newData, _) => {
    setLoading(true);
    updateTransaction(newData.id, newData).then((response) => {
      apiRef.current.updateRows([{...response.data, _action: 'update'}]);
      toast.success("Transaction updated successfully.");
    }).catch((error) => {
      toast.error(
        error.response.data.detail ||
          "Error while updating transaction. Please try again."
      );
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Box
      sx={{
        display: "block",
        justifyContent: "start",
        alignItems: "center",
        margin: 2,
      }}
    >
      {hasWriteAccess && (
        <AddTransactionModel
          open={AddTransactionModelOpen}
          handleClose={() => setAddTransactionModelOpen(false)}
          onSubmit={handleTransactionCreate}
        />
      )}
      <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 4 }}>
        <Grid size={2}>
          <Typography variant="h5" color="textPrimary">
            Transactions
          </Typography>
        </Grid>
        <Grid size={2} justifyContent={"right"} container>
          {hasWriteAccess && (
            <CustomButton
              isPrimary={false}
              onClick={() => setAddTransactionModelOpen(true)}
            >
              Add New Transaction
            </CustomButton>
          )}
        </Grid>
        <Grid size={4} sx={{ height: "72vh" }}>
          <CustomDataGrid
            rows={transactions}
            columns={[
              ...columns,
              {
                field: 'actions',
                type: 'actions',
                headerName: 'Delete',
                getActions: ({ row }) => {
                  return [
                    <GridActionsCellItem
                      icon={<DeleteIcon />}
                      label="Delete"
                      onClick={() => {
                        if (window.confirm(`Are you sure want to delete: '${row.transactionType} of ${row.transactionDate} for ${row.amount}'?`)) {
                          handleDeleteTransaction(row);
                        }
                      }}
                    />
                  ]
                }
              }
            ]}
            autoPageSize={true}
            disableColumnResize={true}
            editMode={hasWriteAccess ? "row" : "disabled"}
            filterMode="client"
            loading={loading}
            autosizeOptions={{
              columns: ['transactionDate', 'transactionType', 'category', 'amount', 'description'],
              includeHeaders: true,
              includeOutliers: true,
              outliersFactor: 0,
              expand: true,
            }}
            autosizeOnMount={true}
            getRowId={(row) => row.id}
            apiRef={apiRef}
            processRowUpdate={handleEditTransaction}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
