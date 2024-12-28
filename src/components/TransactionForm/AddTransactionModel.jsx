import { Modal, Typography, Grid2 as Grid, MenuItem, Box, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import { CustomTextField } from "../common/CustomTextField";
import { CustomButton } from "../common/Button";
import { useTheme } from "../../context/ThemeContext";
import { CustomSelect } from "../common/CustomSelect";
import { CustomDateTimeField } from "../common/CustomDateTimeField";
import dayjs from "dayjs";

const style = {
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: "95vh",
  overflow: "auto",
  opacity: 1,
  zIndex: 100,
};

export const AddTransactionModel = ({ open, handleClose, onSubmit }) => {
  const [transaction, setTransaction] = useState({
    transactionType: "expense",
    transactionDate: dayjs(new Date()),
  });
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
              <MenuItem key="expense" value="expense">
                Default
              </MenuItem>
              <MenuItem key="income" value="income">
                Income
              </MenuItem>
            </CustomSelect>

            <CustomDateTimeField
              isPrimary={true}
              label="Transaction Date"
              fullWidth
              margin="normal"
              value={transaction?.transactionDate}
              onChange={(e) => {
                console.log("e", e);
                debugger
                setTransaction({ ...transaction, transactionDate: e })
              }}
              required={true}
              sx={{ width: "100%" }}
            />

            <CustomTextField
              isPrimary={true}
              label="Amount"
              fullWidth
              margin="normal"
              value={transaction?.amount}
              onChange={(e) => setTransaction({ ...transaction, amount: e.target.value ?? 0 })}
              required={true}
              type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneySharpIcon />
                    </InputAdornment>
                  ),
                },
              }}
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
