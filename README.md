# IoT Demonstrator

This repo contains a small React application with a Node server to visualize IoT data.
The Node server serves the static web application and subscribes to an IoT hub.

# Getting started

To build, you can simply run the react app with `npm start`.
To serve the application and have live telemetry coming through, you need to add a connection string for your Azure IoT Hub in `/server.js`.
