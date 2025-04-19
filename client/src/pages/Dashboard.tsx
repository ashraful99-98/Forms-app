import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { styled, alpha } from "@mui/material/styles";
import {
  Search as SearchIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  Add as AddIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormContext } from "../context/FormContext";
import Forms from "../Components/Form/Forms";

// Styled Components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { createForm, fetchUserForms, forms, fetchAllForms } = useFormContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    if (user?._id) {
      fetchUserForms(user._id);
    }
  }, [user, fetchUserForms]);

  const handleLogout = async () => {
    if (window.confirm("Really want to logout?")) {
      await logout();
      navigate("/");
      // navigate("/login");
    }
  };

  const handleCreateForm = async () => {
    if (!formName.trim() || !user?._id) return;

    const newForm = await createForm({
      name: formName,
      description: formDescription,
      createdBy: user._id,
    });

    console.log("Creating form with:", {
      createdBy: user?._id,
      name: formName,
      description: formDescription,
    });

    if (newForm) {
      setOpen(false);
      setFormName("");
      setFormDescription("");
      navigate(`/form/${newForm._id}`);
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={() => setMobileMoreAnchorEl(null)}
    >
      <MenuItem onClick={() => setOpen(true)}>
        <IconButton color="inherit">
          <AddIcon />
        </IconButton>
        <p>Create Form</p>
      </MenuItem>
      <MenuItem onClick={() => setAnchorEl(null)}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton edge="start" color="inherit">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard Forms
            </Typography>
          </Box>

          {!isMobile && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <AccountCircle />
            </IconButton>
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={(e) => setMobileMoreAnchorEl(e.currentTarget)}
              >
                <MoreIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
      {renderMobileMenu}

      {/* Dialog for Creating Form */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give your form a title and description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Form Title"
            fullWidth
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateForm} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Forms Section */}
      <Box sx={{ padding: 2 }}>
        <Forms fetchAllForms={fetchAllForms} />
      </Box>
    </Box>
  );
};

export default Dashboard;
