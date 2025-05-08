import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'normalize.css'

import mobileCheck from './utils/mobileCheck'
import './main.css'

import routerMobile from './routers/routerMobile';
import routerDesktop from './routers/routerDesktop';

const router = mobileCheck() ? routerMobile : routerDesktop;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
