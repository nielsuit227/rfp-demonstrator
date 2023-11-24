import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  Avatar,
  InputBase,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../imgs/hamilton.png";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: "#0F4879", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <a href={"/"}>
          <img src={logo} alt="Hamilton" height="60px" />
        </a>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Spacing to push the name to the end */}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ mx: "20px" }}>
          Jane Doe
        </Typography>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>J</Avatar>
        </IconButton>
        {/* Search Bar */}
        <div
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            borderRadius: "5px", // Rounded edges
          }}
        >
          <InputBase
            placeholder="Search…"
            style={{ paddingLeft: "5px" }}
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
        {/* End of Search Bar */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          // ... other props
        >
          {/* Menu items */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
