import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routerMobile from "./routers/routerMobile";
import routerDesktop from "./routers/routerDesktop";
import "./styles/theme.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function isMobile() {
  return window.innerWidth <= 768;
}

const router = isMobile() ? routerMobile : routerDesktop;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
