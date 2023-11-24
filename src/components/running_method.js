import React, { useState, useEffect, useCallback } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";

const RunningMethod = ({ isShown, onHide }) => {
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const totalDuration = 45; // Total duration in seconds

  const updateProgress = useCallback(() => {
    if (startTime) {
      const elapsedTime = (new Date().getTime() - startTime.getTime()) / 1000; // Time in seconds
      const updatedProgress = Math.min(
        100,
        (elapsedTime / totalDuration) * 100
      );
      setProgress(updatedProgress);

      if (updatedProgress >= 100) {
        toast.success("Run exp.3482-31 finished successfully.");
        onHide(); // Call the hide callback once completed
      }
    }
  }, [startTime, onHide]);

  useEffect(() => {
    if (isShown) {
      toast.success("Run exp.3482-31 started.");
      const newStartTime = new Date();
      setStartTime(newStartTime);
      setProgress(0); // Reset progress when starting
    }
  }, [isShown]);

  useEffect(() => {
    let interval;
    if (isShown && startTime) {
      interval = setInterval(updateProgress, 1000); // Update progress every second
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isShown, startTime, updateProgress]);

  const remainingSeconds = startTime
    ? Math.max(
        0,
        totalDuration -
          Math.floor((new Date().getTime() - startTime.getTime()) / 1000)
      )
    : totalDuration;

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

export default RunningMethod;
