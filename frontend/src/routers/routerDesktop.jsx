import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import HomeDesktop from '../pages/desktop/HomeDesktop';
import DashboardDesktop from '../pages/desktop/DashboardDesktop';
import LoginDesktop from '../pages/desktop/LoginDesktop';
import RegisterDesktop from '../pages/desktop/RegisterDesktop';


const routerDesktop = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomeDesktop /> },
      { path: '/dashboard', element: <DashboardDesktop /> },
      { path: '/login', element: <LoginDesktop /> },
      { path: '/register', element: <RegisterDesktop /> },
    ]
  }
]);

export default routerDesktop;
