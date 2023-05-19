import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";

function NavBarProfile({ setIsLoggedIn, setUserCode }) {
  const [anchor, setAnchor] = useState(null);
  const openMenu = (e) => {
    setAnchor(e.currentTarget);
  };
  const closeMenu = (e) => {
    setAnchor(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserCode("");
    // Remove state from local storage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userCode");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar
          position="static"
          style={{ backgroundColor: "#F5F5F5" }}
          elevation={0}
        >
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={openMenu}
                color="inherit"
                style={{ color: "#181616" }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchor}
                keepMounted
                open={Boolean(anchor)}
                onClose={closeMenu}
                PaperProps={{
                  style: {
                    width: 200,
                    paddingLeft: 10,
                    paddingRight: 10,
                  },
                }}
              >
                <MenuItem sx={{ fontSize: 20 }}>
                  <AssignmentIndIcon sx={{ paddingRight: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem sx={{ fontSize: 20 }}>
                  <SettingsIcon sx={{ paddingRight: 1 }} />
                  Settings
                </MenuItem>
                <MenuItem sx={{ fontSize: 20 }}>
                  <SupportIcon sx={{ paddingRight: 1 }} />
                  Support
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ fontSize: 20 }}>
                  <LogoutIcon sx={{ paddingRight: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBarProfile;
