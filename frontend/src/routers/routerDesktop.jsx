import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import HomeDesktop from '../pages/desktop/HomeDesktop';
import DashboardDesktop from '../pages/desktop/DashboardDesktop';
import LoginDesktop from '../pages/desktop/LoginDesktop';


const routerDesktop = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomeDesktop /> },
      { path: '/dashboard', element: <DashboardDesktop /> },
      { path: '/login', element: <LoginDesktop /> },
    ]
  }
]);

export default routerDesktop;
