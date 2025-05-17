import { createBrowserRouter, Navigate } from 'react-router-dom';
import LayoutDesktop from '../layouts/desktop/LayoutDesktop';
import LayoutAdmin from '../layouts/admin/LayoutAdmin';

import HomeDesktop from '../pages/desktop/HomeDesktop';
import DashboardDesktop from '../pages/desktop/DashboardDesktop';
import LoginDesktop from '../pages/desktop/LoginDesktop';
import RegisterDesktop from '../pages/desktop/RegisterDesktop';
import CartDesktop from '../pages/desktop/CartDesktop';
import HistoryDesktop from '../pages/desktop/HistoryDesktop';

import ManageAccounts from '../pages/admin/ManageAccounts';
import ManageBooks from '../pages/admin/ManageBooks';
import Statistics from '../pages/admin/Statistics';
import ProtectedAdminRoute from "../components/admin/ProtectedAdminRoute";
import AdminLogin from '../pages/admin/AdminLogin';
import Logout from '../pages/admin/Logout';
import OrderHistory from '../components/desktop/orderHistory/orderHistory';

const routerDesktop = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDesktop />,
    children: [
      { index: true, element: <HomeDesktop /> },
      { path: 'dashboard', element: <DashboardDesktop /> },
      { path: 'login', element: <LoginDesktop /> },
      { path: 'register', element: <RegisterDesktop /> },
      { path: 'cart', element: <CartDesktop /> },
      { path: 'history', element: <HistoryDesktop /> },

    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        element: <AdminLogin />
      },
      {
        path: 'logout',
        element: <Logout />
      },
      {
        path: '',
        element: <ProtectedAdminRoute />,
        children: [
          {
            element: <LayoutAdmin />,
            children: [
              { index: true, element: <Navigate to="accounts" replace /> },
              { path: 'accounts', element: <ManageAccounts /> },
              { path: 'books', element: <ManageBooks /> },
              { path: 'statistics', element: <Statistics /> },
            ]
          }
        ]
      }
    ]
  }
]);

export default routerDesktop;
