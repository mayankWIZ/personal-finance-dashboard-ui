import React, { useEffect, useState } from 'react';
import { CustomSelect } from '../components/common/CustomSelect';
import { getUsers } from '../services/apiService';
import { Box, Grid2 as Grid, MenuItem, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { CustomFileUploadButton } from '../components/common/CustomFileUploadButton';
import { CustomButton } from '../components/common/Button';

export const TransactionBulkUploadDownload = () => {

    const [selectedUser, setSelectedUser] = useState("");
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
    

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                margin: 2,
            }}
        >
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} justifyItems={"space-between"} sx={{ width: "100%" }}>
                <Grid size={{}}>
                    <Grid size={12}>
                        <Typography variant="h5" color="textPrimary">
                            Transaction Bulk Upload
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <CustomSelect
                            isPrimary={true}
                            formControlProps={{
                            sx: { minWidth: 120, margin: "1rem 0 1rem 0" },
                            fullWidth: true,
                            }}
                            label="User"
                            labelId="user"
                            margin="normal"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            required={true}
                            fullWidth
                            loading={loading}
                        >
                            {
                                users.map((user) => {
                                    return (
                                        <MenuItem key={user.username} value={user.username}>
                                            {user.fullName}
                                        </MenuItem>
                                    )
                                })
                            }
                        </CustomSelect>
                    </Grid>
                    <Grid size={12}>
                        <CustomFileUploadButton />
                    </Grid>
                </Grid>

                <Grid size={{}}>
                    <Grid size={12}>
                        <Typography variant="h5" color="textPrimary">
                            Transaction Bulk Export
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <CustomSelect
                            isPrimary={true}
                            formControlProps={{
                            sx: { minWidth: 120, margin: "1rem 0 1rem 0" },
                            fullWidth: true,
                            }}
                            label="User"
                            labelId="user"
                            margin="normal"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            required={true}
                            fullWidth
                            loading={loading}
                        >
                            {
                                users.map((user) => {
                                    return (
                                        <MenuItem key={user.username} value={user.username}>
                                            {user.fullName}
                                        </MenuItem>
                                    )
                                })
                            }
                        </CustomSelect>
                    </Grid>
                    <Grid size={12}>
                        <CustomButton isPrimary={true}>Download</CustomButton>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
