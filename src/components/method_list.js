import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const methods = [
  { type: "info", datetime: "2023-11-23 10:00", name: "Problem Solved" },
  {
    type: "error",
    datetime: "2023-11-23 09:45",
    name: "DT can not be dropped",
  },
  {
    type: "info",
    datetime: "2023-11-23 09:30",
    name: "Run exp.3452-32 started",
  },
  {
    type: "info",
    datetime: "2023-11-23 09:15",
    name: "Run exp.3452-31 finished",
  },
  {
    type: "info",
    datetime: "2023-11-23 09:00",
    name: "Run exp.3452-31 started",
  },
];

const MethodList = () => {
  const getIcon = (type) => {
    switch (type) {
      case "error":
        return <ReportProblemIcon color="error" />;
      case "info":
        return <InfoIcon style={{ color: "#0F4879" }} />;
      case "warning":
        return <WarningIcon />;
      default:
        return <InfoIcon color="#0F4879" />;
    }
  };

  return (
    <List dense mt={15}>
      <Typography sx={{ paddingTop: 4, paddingLeft: 2 }}>
        Last Actions
      </Typography>
      {methods.map((method, index) => (
        <React.Fragment key={method.id}>
          {index > 0 && <Divider />}
          <ListItem>
            <ListItemIcon>{getIcon(method.type)}</ListItemIcon>
            <ListItemText primary={method.name} secondary={method.datetime} />
            <ListItemSecondaryAction>
              <IconButton>
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default MethodList;
