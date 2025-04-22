import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AccountCircle,
  MoreVert as MoreIcon,
  Group as GroupIcon,
  Description as DescriptionIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
      navigate("/");
    }
  };

  const handleNavigateUsers = () => {
    navigate("/admin/users");
    handleMobileMenuClose();
  };

  const handleNavigateForms = () => {
    navigate("/admin/forms");
    handleMobileMenuClose();
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleNavigateUsers}>
        <GroupIcon sx={{ mr: 1 }} />
        Users
      </MenuItem>
      <MenuItem onClick={handleNavigateForms}>
        <DescriptionIcon sx={{ mr: 1 }} />
        Forms
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <LogoutIcon sx={{ mr: 1 }} />
        Logout
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNavigateUsers}>
        <IconButton color="inherit">
          <GroupIcon />
        </IconButton>
        <Typography variant="body2">Users</Typography>
      </MenuItem>
      <MenuItem onClick={handleNavigateForms}>
        <IconButton color="inherit">
          <DescriptionIcon />
        </IconButton>
        <Typography variant="body2">Forms</Typography>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton color="inherit">
          <LogoutIcon />
        </IconButton>
        <Typography variant="body2">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", px: isMobile ? 1 : 3 }}>
          {/* Logo or Title */}
          <Typography
            variant={isMobile ? "h6" : "h5"}
            noWrap
            component="div"
            sx={{ flexShrink: 0 }}
          >
            Admin Dashboard
          </Typography>

          {/* Right-side icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isMobile && (
              <>
                <IconButton color="inherit" onClick={handleNavigateUsers}>
                  <GroupIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleNavigateForms}>
                  <DescriptionIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </>
            )}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="show more"
                aria-controls="mobile-menu"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menus */}
      {renderMenu}
      {renderMobileMenu}
    </Box>
  );
};

export default AdminHeader;
