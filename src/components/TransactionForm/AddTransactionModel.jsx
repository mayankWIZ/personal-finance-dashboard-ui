import { Modal, Typography, Grid2 as Grid, MenuItem, Box } from "@mui/material";
import React, { useState } from "react";
import { CustomTextField } from "../common/CustomTextField";
import { CustomButton } from "../common/Button";
import { useTheme } from "../../context/ThemeContext";
import { CustomSelect } from "../common/CustomSelect";
import { CustomDateTimeField } from "../common/CustomDateTimeField";

const style = {
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: "95vh",
  overflow: "auto",
  opacity: 1,
  zIndex: 100,
};

export const AddTransactionModel = ({ open, handleClose, onSubmit }) => {
  const [transaction, setTransaction] = useState({});
  const { theme, mode } = useTheme();

  const handleInnerSubmit = (e) => {
    e.preventDefault();
    onSubmit(transaction);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ ...style }}
      disableScrollLock={false}
      BackdropProps={{
        sx: {...(mode === "dark" ? { backgroundColor: theme.palette.primary.contrastText } : {})},
      }}
    >
      <Box
        component="form"
        onSubmit={handleInnerSubmit}
      >
        <Grid
          container
          sx={{
            maxWidth: 400,
            mx: "auto",
            mt: 5,
            borderRadius: 3,
            border: "ActiveBorder",
            backgroundColor: theme.palette.background.default,
            padding: 2,
            paddingBottom: 1,
            marginBottom: 1,
          }}
        >
          <Grid xs={12}>
            <Typography variant="h5" color="textPrimary">
              New Transaction
            </Typography>
          </Grid>
          <Grid xs={12}>

            <CustomSelect
              isPrimary={true}
              formControlProps={{
                sx: { minWidth: 120, margin: "1rem 0 1rem 0" },
                fullWidth: true,
              }}
              label="Transaction Type"
              labelId="transaction-type"
              margin="normal"
              value={transaction.transactionType}
              onChange={(e) => setTransaction({ ...transaction, transactionType: e.target.value })}
              required={true}
              fullWidth
            >
              {
                  ["income", "expense", "investment"].map((transactionType) => {
                      return (
                          <MenuItem key={transactionType} value={transactionType}>
                              {transactionType.toUpperCase()}
                          </MenuItem>
                      )
                  })
              }
            </CustomSelect>

            <CustomDateTimeField
              isPrimary={true}
              label="Transaction Date"
              fullWidth
              margin="normal"
              value={transaction?.transactionDate}
              onChange={(e) => setTransaction({ ...transaction, transactionDate: e.target.value })}
              required={true}
            />

            <CustomTextField
              isPrimary={true}
              label="Amount"
              fullWidth
              margin="normal"
              value={transaction?.amount || 0}
              onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
              required={true}
              type="number"
            />

            <CustomTextField
              isPrimary={true}
              label="Category"
              fullWidth
              margin="normal"
              value={transaction?.category}
              onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
              required={true}
            />

            <CustomTextField
              isPrimary={true}
              label="Description"
              multiline
              fullWidth
              margin="normal"
              value={transaction?.description}
              onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
              required={true}
            />

            <CustomButton
              type="submit"
              isPrimary={true}
              fullWidth
              sx={{ marginBottom: 1 }}
            >
              Create Transaction
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
