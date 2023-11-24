import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const ServiceReminder = () => {
  const totalDays = 365;
  const remainingDays = 213;
  const progress = ((totalDays - remainingDays) / totalDays) * 100;

  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="#f5f5f5" // Background color for the entire component
      p={1} // Padding around the component
      borderRadius={2} // Optional: Adds rounded corners
    >
      <CircularProgress
        variant="determinate"
        value={progress}
        style={{ color: "#4caf50" }} // Make the progress bar green
      />
      <Box
        display="flex"
        flexDirection="column"
        ml={2} // Margin left to separate text from progress bar
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${remainingDays} days remaining`}
        </Typography>
        <Typography variant="body2">
          Service due in {remainingDays} days
        </Typography>
      </Box>
    </Box>
  );
};

export default ServiceReminder;
