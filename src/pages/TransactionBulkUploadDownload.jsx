import React, { useEffect, useState } from "react";
import { CustomSelect } from "../components/common/CustomSelect";
import {
  getUsers,
  importTransactions,
  exportTransactions,
} from "../services/apiService";
import { Box, Grid2 as Grid, MenuItem, Typography } from "@mui/material";
import { toast } from "react-toastify";
import CustomFileUploadButton from "../components/common/CustomFileUploadButton";
import { CustomButton } from "../components/common/Button";
import { useAuth } from "../context/AuthContext";

export const TransactionBulkUploadDownload = () => {
  const { authState } = useAuth();
  const [importSelectedUser, setImportSelectedUser] = useState(authState.user.username);
  const [importFile, setImportFile] = useState(null);
  const [exportSelectedUser, setExportSelectedUser] = useState(authState.user.username);
  const [importValidationMessage, setImportValidationMessage] = useState("");
  const [exportValidationMessage, setExportValidationMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((response) => {
        setUsers(response.data);
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

  const handleImport = (e) => {
    e.preventDefault();
    if (!importFile || !importSelectedUser) {
      setImportValidationMessage("Please select a file and a user.");
      return;
    }
    setImportValidationMessage("");
    setLoading(true);
    importTransactions(importFile, importSelectedUser)
      .then((response) => {
        toast.success("Transactions imported successfully.");
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.detail ||
            "Error while importing transactions. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleExport = (e) => {
    e.preventDefault();
    if (!exportSelectedUser) {
      setExportValidationMessage("Please select a user.");
      return;
    }
    setExportValidationMessage("");
    setLoading(true);
    exportTransactions(exportSelectedUser)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = `transactions-${exportSelectedUser}-${Date.now().toString()}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Transactions exported successfully.");
      })
      .catch((error) => {
        toast.error(
          error.response.data.detail ||
            "Error while exporting transactions. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
              Transaction Bulk Import/Export
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 6, sm: 6, md: 6 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          container
        >
          <Grid size={12} justifyContent={"center"}>
            <Box sx={{ width: "100%", textAlign: "left", paddingLeft: 1 }}>
              <Typography variant="h6" color="textSecondary">
                Import Transactions
              </Typography>
            </Box>
          </Grid>
          <Grid size={12} sx={{ padding: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <CustomSelect
                label="Select User"
                labelId="user-select-label"
                value={importSelectedUser}
                onChange={(e) => setImportSelectedUser(e.target.value)}
                isPrimary={true}
                formControlProps={{
                  sx: { minWidth: 120 },
                  fullWidth: true,
                }}
                margin="normal"
                fullWidth
                disabled={loading}
              >
                <MenuItem key={authState.user.username} value={authState.user.username}>
                  Self
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.username} value={user.username}>
                    {user.fullName}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Box>
          </Grid>
          <Grid
            size={12}
            sx={{
              border: "1px solid",
              borderColor: "text.secondary",
              borderRadius: 2,
              padding: 1,
            }}
            justifyContent={"center"}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                minHeight: 50,
                display: "grid",
              }}
              component="form"
              onSubmit={handleImport}
            >
              <Box sx={{ margin: "auto" }}>
                <Typography variant="body1" color="error">
                  {importValidationMessage}
                </Typography>
              </Box>
              <Box sx={{ margin: "auto" }}>
                <CustomFileUploadButton
                  isPrimary={false}
                  fileSetter={setImportFile}
                  disabled={loading}
                  required={true}
                />
              </Box>
              <Box sx={{ justifySelf: "end" }}>
                <CustomButton
                  isPrimary={false}
                  disabled={loading}
                  type="submit"
                >
                  Import
                </CustomButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 6, sm: 6, md: 6 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          container
          alignContent={"start"}
        >
          <Grid size={12} justifyContent={"center"}>
            <Box sx={{ width: "100%", textAlign: "left", paddingLeft: 1 }}>
              <Typography variant="h6" color="textSecondary">
                Export Transactions
              </Typography>
            </Box>
          </Grid>
          <Grid size={12} sx={{ padding: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <CustomSelect
                label="Select User"
                labelId="user-select-label"
                value={exportSelectedUser}
                onChange={(e) => setExportSelectedUser(e.target.value)}
                isPrimary={true}
                formControlProps={{
                  sx: { minWidth: 120 },
                  fullWidth: true,
                }}
                margin="normal"
                fullWidth
                disabled={loading}
              >
                <MenuItem key={authState.user.username} value={authState.user.username}>
                  Self
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.username} value={user.username}>
                    {user.fullName}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Box>
          </Grid>
          <Grid
            size={12}
            sx={{
              padding: 1,
            }}
            justifyContent={"center"}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                minHeight: 50,
                display: "grid",
              }}
              component="form"
              onSubmit={handleExport}
            >
              <Box sx={{ margin: "auto" }}>
                <Typography variant="body1" color="error">
                  {exportValidationMessage}
                </Typography>
              </Box>
              <Box sx={{ margin: "auto", width: "100%" }}>
                <CustomButton
                  isPrimary={true}
                  disabled={loading}
                  type="submit"
                  sx={{ marginBottom: 1, width: "100%" }}
                  fullWidth
                >
                  Export
                </CustomButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
