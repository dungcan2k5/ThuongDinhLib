import { createBrowserRouter } from 'react-router-dom';
import LayoutDesktop from '../layouts/desktop/LayoutDesktop';
import HomeDesktop from '../pages/desktop/HomeDesktop';
import DashboardDesktop from '../pages/desktop/DashboardDesktop';
import LoginDesktop from '../pages/desktop/LoginDesktop';
import RegisterDesktop from '../pages/desktop/RegisterDesktop';
import CartDesktop from '../pages/desktop/CartDesktop';

const routerDesktop = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDesktop />,
    children: [
      { path: '/', element: <HomeDesktop /> },
      { path: '/dashboard', element: <DashboardDesktop /> },
      { path: '/login', element: <LoginDesktop /> },
      { path: '/register', element: <RegisterDesktop />},
      { path: '/dashboard', element: <DashboardDesktop />},
      { path: '/cart', element: <CartDesktop />}
    ]
  }
]);

export default routerDesktop;
