import { Modal, Typography, Grid2 as Grid, MenuItem, Box } from "@mui/material";
import React, { useState } from "react";
import { SCOPES } from "../utils/scopes";
import { CustomTextField } from "../common/CustomTextField";
import { CustomButton } from "../common/Button";
import { useTheme } from "../../context/ThemeContext";
import { CustomSelect } from "../common/CustomSelect";

const style = {
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight: "95vh",
  overflow: "auto",
  opacity: 1,
  zIndex: 100,
};

export const AddUserModel = ({ open, handleClose, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [scopes, setScopes] = useState(SCOPES.Me);
  const { theme, mode } = useTheme();

  const handleInnerSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password, fullName, emailAddress, scopes });
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
              New User
            </Typography>
          </Grid>
          <Grid xs={12}>
            <CustomTextField
              isPrimary={true}
              label="Full Name"
              fullWidth
              margin="normal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required={true}
            />

            <CustomTextField
              isPrimary={true}
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={true}
            />

            <CustomTextField
              isPrimary={true}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />

            <CustomTextField
              isPrimary={true}
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e) => {
                if (
                  e.target.value === password ||
                  e.target.value === "" ||
                  password === ""
                ) {
                  setValidPassword(true);
                } else {
                  setValidPassword(false);
                }
              }}
              required={true}
              error={!validPassword}
              helperText={!validPassword ? "Passwords do not match" : ""}
            />

            <CustomTextField
              isPrimary={true}
              label="Email"
              fullWidth
              margin="normal"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required={true}
              type="email"
            />

            <CustomSelect
              isPrimary={true}
              formControlProps={{
                sx: { minWidth: 120, margin: "1rem 0 1rem 0" },
                fullWidth: true,
              }}
              label="Scope"
              labelId="scope"
              margin="normal"
              value={scopes}
              onChange={(e) => setScopes(e.target.value)}
              required={true}
              fullWidth
            >
              {
                  Object.keys(SCOPES).map((key) => {
                      return (
                          <MenuItem key={key} value={SCOPES[key]}>
                              {key}
                          </MenuItem>
                      )
                  })
              }
            </CustomSelect>

            <CustomButton
              type="submit"
              isPrimary={true}
              fullWidth
              sx={{ marginBottom: 1 }}
            >
              Create
            </CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
