import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "sweetalert2/dist/sweetalert2.js";

import mobileCheck from "./utils/mobileCheck";
import "./main.css";

const App = () => {
  const [router, setRouter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRouter = async () => {
      const routerPromise = mobileCheck()
        ? import("./routers/routerMobile")
        : import("./routers/routerDesktop");

      const loadingPromise = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const [{ default: loadedRouter }] = await Promise.all([
        routerPromise,
        loadingPromise,
      ]);

      setRouter(loadedRouter);
      setIsLoading(false);
    };

    loadRouter();
  }, []);

  if (isLoading || !router)
    return (
      <div className="loading-container">
        <div className="loading-wrapper">
          <img
            src="/SquareThuongDinhLib.png"
            alt="ThuongDinhLib Logo"
            className="loading-logo"
          />
          <div className="loading-spinner"></div>
        </div>
      </div>
    );

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
