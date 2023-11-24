import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Toolbar,
  AppBar,
  IconButton,
  Divider,
} from "@mui/material";
import ServiceReminder from "../components/serviceReminder";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import microlabStar from "../imgs/microlab_star.png";
import NavBar from "../components/navbar";
import useDataSocket from "../components/websocket";
import SideMenu from "../components/sidemenu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MethodList from "../components/method_list";
import { toast, ToastContainer } from "react-toastify";
import MethodsBarChart from "../components/barchart";
import RunningMethod from "../components/running_method";

const colors = ["#e7edf2", "#0f4879", "#01070c"];
const chartOptions = {
  maintainAspectRatio: false,
  aspectRatio: 1.5,
  scales: {
    x: {
      title: {
        display: true,
        text: "Time",
      },
    },
    y: {
      title: {
        display: true,
        text: "Acceleration [mm/s2]",
      },
    },
  },
};

function Device() {
  const [accX, setAccelerometerX] = useState([0, 1]);
  const [accY, setAccelerometerY] = useState([0, 1]);
  const [accZ, setAccelerometerZ] = useState([0, 1]);
  const [timestamps, setTimestamps] = useState([
    new Date(new Date() - 1000),
    new Date(),
  ]);
  const [deviceState, setDeviceState] = useState(false);
  const [showRunningMethod, setShowRunningMethod] = useState(false);
  const setOfflineRef = useRef();

  const handleWebSocketMessage = (message) => {
    try {
      const messageData = JSON.parse(message.data);
      // time and either temperature or humidity are required
      if (!deviceState) {
        setDeviceState(true);
        toast.success("Instrument XYZ123 reconnected!");
      }
      if (setOfflineRef.current) {
        clearTimeout(setOfflineRef.current);
      }
      setOfflineRef.current = setTimeout(() => {
        setDeviceState(false);
        toast.error("Instrument XYZ123 lost connection.");
      }, 2000);

      // time and either temperature or humidity are required
      if (messageData.deviceState) {
        setShowRunningMethod(true);
      }
      if (messageData.accelerometerX) {
        setTimestamps((x) => [...x.slice(-100), messageData.timestamp]);
        setAccelerometerX((x) => [
          ...x.slice(-100),
          messageData.accelerometerX,
        ]);
        setAccelerometerY((x) => [
          ...x.slice(-100),
          messageData.accelerometerY,
        ]);
        setAccelerometerZ((x) => [
          ...x.slice(-100),
          messageData.accelerometerZ,
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    });
  }
  useDataSocket(handleWebSocketMessage);

  const data = {
    labels: timestamps.map((t) => formatTime(t)),
    datasets: [
      {
        label: "AccelerometerX",
        data: accX,
        borderColor: colors[0],
      },
      {
        label: "AccelerometerY",
        data: accY,
        borderColor: colors[1],
      },
      {
        label: "AccelerometerZ",
        data: accZ,
        borderColor: colors[2],
      },
    ],
  };
  return (
    <Box sx={{ display: "flex" }}>
      <ToastContainer />
      <NavBar />
      <SideMenu />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <AppBar position="static" sx={{ backgroundColor: "#0F48791A", mb: 2 }}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="#1C78C7" aria-label="back">
              <ArrowBackIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" color="#3C3C4F">
                  Microlab STAR Dilution
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="#3C3C4FA0" mt={-1}>
                  Microlab STAR
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={3}>
                <img
                  width="200"
                  src={microlabStar}
                  alt="Machine"
                  sx={{ objectFit: "contain" }}
                />
                <Typography variant="h4">Microlab Star</Typography>
                <Grid item container xs={6} alignItems="center">
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      Status:
                    </Typography>
                  </Grid>
                  <Grid item sx={{ mx: 2 }}>
                    {deviceState === true ? (
                      <Chip
                        color="success"
                        label="Online"
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      <Chip
                        color="error"
                        label="Offline"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Serial: XYZ123
                  </Typography>
                </Grid>
                <Grid item my={1}>
                  <RunningMethod
                    isShown={showRunningMethod}
                    onHide={() => setShowRunningMethod(false)}
                  />
                </Grid>
                <Grid item>
                  <ServiceReminder />
                </Grid>
                <Grid item>
                  <MethodList />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                <div style={{ height: "300px", width: "100%" }}>
                  <Line data={data} options={chartOptions} />
                </div>
                <div style={{ height: "300px", width: "100%" }}>
                  <MethodsBarChart />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Device;
