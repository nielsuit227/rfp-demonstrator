import React, { useState, useRef } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import microlabStar from "../imgs/microlab_star.png";
import microlabPrep from "../imgs/microlab_pre.png";
import verso from "../imgs/verso_q20.png";
import useDataSocket from "../components/websocket";
import SideMenu from "../components/sidemenu";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const setOfflineRef = useRef();
  const [deviceState, setDeviceState] = useState(false);

  const handleWebSocketMessage = (message) => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  };
  useDataSocket(handleWebSocketMessage);

  return (
    <Box sx={{ display: "flex" }}>
      <ToastContainer />
      <NavBar />
      <SideMenu />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
          {/* Repeat this Grid item for multiple boxes */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              onClick={() => navigate("/devices/xyz123")}
              sx={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                height="140"
                width="200"
                image={microlabStar}
                alt="Machine"
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Microlab Star
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status:{" "}
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
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Serial: XYZ123
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                width="200"
                image={verso}
                alt="Machine"
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Verso Q20
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status:{" "}
                  <Chip
                    color="error"
                    label="Offline"
                    variant="outlined"
                    size="small"
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Serial: XYZ124
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                width="200"
                image={microlabPrep}
                alt="Machine"
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Microlab PREP
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status:{" "}
                  <Chip
                    color="error"
                    label="Offline"
                    variant="outlined"
                    size="small"
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Serial: XYZ123
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* End of repeated Grid item */}
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
