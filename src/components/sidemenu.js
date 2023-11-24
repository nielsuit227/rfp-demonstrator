import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SpeedIcon from "@mui/icons-material/Speed"; // Assuming this for Asset Performance
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import { styled } from "@mui/material/styles";

const appBarHeight = "200px"; // Adjust this value according to your app bar's height

const StyledDrawer = styled(Drawer)({
  width: "250px",
  flexShrink: 0,
  paddingTop: appBarHeight,
  "& .MuiDrawer-paper": {
    width: "250px",
    paddingTop: "100px",
    backgroundColor: "#f0f0f0", // Very light gray background
    color: "black",
  },
});

const StyledListItem = styled(ListItem)({
  margin: "5px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "#0F4879", // Darker on hover
  },
});

function SideMenu() {
  return (
    <StyledDrawer
      variant="permanent"
      anchor="left"
      sx={{
        width: "250px",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: "250px", boxSizing: "border-box" },
      }}
    >
      <List>
        {[
          { text: "Asset Dashboard", icon: <DashboardIcon /> },
          { text: "Asset Monitoring", icon: <TrackChangesIcon /> },
          { text: "Asset Performance", icon: <SpeedIcon /> },
          { text: "Asset Settings", icon: <SettingsIcon /> },
          { text: "Alert & Notification", icon: <NotificationsIcon /> },
          { text: "Support / Help", icon: <HelpIcon /> },
        ].map((item) => (
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <StyledListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          </Link>
        ))}
      </List>
    </StyledDrawer>
  );
}

export default SideMenu;
