import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";

const RunningMethod = ({ isShown, onHide }) => {
  const [startTime, setStartTime] = useState(null);
  const totalDuration = 45; // Total duration in seconds

  useEffect(() => {
    if (isShown) {
      toast.success("Run exp.3482-31 started.");
      setStartTime(new Date());
    }
  }, [isShown]);

  const remainingSeconds = startTime
    ? Math.max(
        0,
        totalDuration -
          Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
      )
    : totalDuration;
  const progress = Math.min(
    100,
    ((totalDuration - remainingSeconds) * 100) / totalDuration
  );
  if (progress > 99) {
    onHide();
  }

  return (
    isShown && (
      <Box
        display="flex"
        alignItems="center"
        bgcolor="#f5f5f5"
        borderRadius={2}
        p={1}
      >
        <CircularProgress
          variant="determinate"
          value={progress}
          style={{ color: "#4caf50" }}
        />
        <Box display="flex" flexDirection="column" ml={2}>
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(progress)}% completed`}
          </Typography>
          <Typography variant="body2">
            Running method, {remainingSeconds}s remaining.
          </Typography>
        </Box>
      </Box>
    )
  );
};

export default React.memo(RunningMethod);
