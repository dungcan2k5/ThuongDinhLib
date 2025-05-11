import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routerMobile from "./routers/routerMobile";
import routerDesktop from "./routers/routerDesktop";
import "./styles/theme.css";
function isMobile() {
  return window.innerWidth <= 768;
}

const router = isMobile() ? routerMobile : routerDesktop;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
