import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import mobileCheck from './utils/mobileCheck';
import './main.css';
import "normalize.css"

const App = () => {
  const [router, setRouter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRouter = async () => {
      const routerPromise = mobileCheck() 
        ? import('./routers/routerMobile')
        : import('./routers/routerDesktop');

      const loadingPromise = new Promise(resolve => 
        setTimeout(resolve, 1000)
      );

      const [{ default: router }] = await Promise.all([
        routerPromise,
        loadingPromise
      ]);

      setRouter(router);
      setIsLoading(false);
    };

    loadRouter();
  }, []);

  if (isLoading || !router) return (
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
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);