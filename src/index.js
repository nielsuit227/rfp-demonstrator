import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/overview";
import Device from "./pages/device";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/devices/xyz123", element: <Device /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
