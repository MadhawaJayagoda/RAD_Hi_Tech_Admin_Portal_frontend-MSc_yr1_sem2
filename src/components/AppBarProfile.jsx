import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

function AppBarProfile() {
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" style={{ backgroundColor: "#F5F5F5" }}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              style={{ color: "#181616" }}
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default AppBarProfile;
