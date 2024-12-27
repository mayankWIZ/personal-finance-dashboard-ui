import React, { useEffect, useState } from "react";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomDataGrid } from "../components/common/CustomDataGrid";
import { getUsers, createUser, updateUser, deleteUser } from "../services/apiService";
import { toast } from "react-toastify";
import { SCOPES } from "../components/utils/scopes";
import { AddUserModel } from "../components/UserForm/AddUserModel";
import { CustomButton } from "../components/common/Button";
import { GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";

const columns = [
  {
    field: "username",
    headerName: "Username",
    type: "string",
    editable: false,
  },
  {
    field: "fullName",
    headerName: "Full Name",
    type: "string",
    editable: true,
  },
  {
    field: "emailAddress",
    headerName: "Email",
    type: "string",
    editable: true,
  },
  {
    field: "scopes",
    headerName: "Scopes",
    type: "singleSelect",
    valueOptions: Object.entries(SCOPES).map(([key, value]) => ({
      label: key,
      value: value.join(","),
    })),
    editable: true,
  },
];

export const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [AddUserModelOpen, setAddUserModelOpen] = useState(false);
  const apiRef = useGridApiRef();
  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((response) => {
        setUsers(response.data?.map((user) => ({ id: user.username, ...user, scopes: user.scopes.join(",") })));
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
  const handleUserCreate = ({ ...user }) => {
    setLoading(true);
    createUser(user).then((response) => {
      apiRef.current.updateRows([{id: response.data.username, ...response.data, scopes: response.data.scopes.join(",") }]);
      toast.success("User created successfully.");
      setAddUserModelOpen(false);
    }).catch((error) => {
      toast.error(
        error.response.data.detail ||
          "Error while creating user. Please try again."
      );
    }).finally(() => {
      setLoading(false);
    });
  };

  const handleDeleteUser = (row) => {
    setLoading(true);
    deleteUser(row.username).then((response) => {
      apiRef.current.updateRows([{...row, _action: 'delete'}]);
      toast.success("User deleted successfully.");
    }).catch((error) => {
      toast.error(
        error.response.data.detail ||
          "Error while deleting user. Please try again."
      );
    }).finally(() => {
      setLoading(false);
    });    
  };

  const handleEditUser = (newData, oldData) => {
    setLoading(true);
    updateUser({...newData, scopes: newData.scopes.split(",")}).then((response) => {
      apiRef.current.updateRows([{...response.data, _action: 'update', id: oldData.username}]);
      toast.success("User updated successfully.");
    }).catch((error) => {
      toast.error(
        error.response.data.detail ||
          "Error while updating user. Please try again."
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
      <AddUserModel
        open={AddUserModelOpen}
        handleClose={() => setAddUserModelOpen(false)}
        onSubmit={handleUserCreate}
      />
      <Grid container spacing={2} columns={{ xs: 4, sm: 4, md: 4 }}>
        <Grid size={2}>
          <Typography variant="h5" color="textPrimary">
            Users
          </Typography>
        </Grid>
        <Grid size={2} justifyContent={"right"} container>
          <CustomButton
            isPrimary={false}
            onClick={() => setAddUserModelOpen(true)}
          >
            Add User
          </CustomButton>
        </Grid>
        <Grid size={4} sx={{ height: "72vh" }}>
          <CustomDataGrid
            rows={users}
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
                        if (window.confirm(`Are you sure want to delete: '${row.username}'?`)) {
                          handleDeleteUser(row);
                        }
                      }}
                    />
                  ]
                }
              }
            ]}
            autoPageSize={true}
            disableColumnResize={true}
            editMode="row"
            filterMode="client"
            loading={loading}
            autosizeOptions={{
              columns: ["username", "fullName", "emailAddress", "scopes"],
              includeHeaders: true,
              includeOutliers: true,
              outliersFactor: 30,
              expand: true,
            }}
            autosizeOnMount={true}
            getRowId={(row) => row.id}
            apiRef={apiRef}
            processRowUpdate={handleEditUser}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
