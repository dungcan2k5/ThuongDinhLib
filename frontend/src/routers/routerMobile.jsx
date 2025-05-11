import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import HomeMobile from "../pages/mobile/HomeMobile/HomeMobile.jsx";
import LoginMobile from "../components/mobile/LoginMobile/LoginMobile.jsx";
import RegisterMobile from "../components/mobile/RegisterMobile/RegisterMobile.jsx";
import MainLayoutMobile from "../layouts/mobile/MainLayoutMobile.jsx";
import UserDashboardMobile from "../pages/mobile/UserDashboardMobile/UserDashboardMobile.jsx";
import CartMobile from "../pages/mobile/Cart&Checkout/CartMobile/CartMobile.jsx";
import CheckoutMobile from "../pages/mobile/Cart&Checkout/CheckoutMobile/CheckoutMobile.jsx";
const routerMobile = createBrowserRouter([
  {
    path: "/",
    element: <MainLayoutMobile />,
    children: [
      {
        path: "/",
        element: <HomeMobile />,
      },
      {
        path: "/login",
        element: <LoginMobile />,
      },
      {
        path: "/register",
        element: <RegisterMobile />,
      },
      {
        path: "/user-dashboard",
        element: <UserDashboardMobile />,
      },
      {
        path: "/cart",
        element: <CartMobile />,
      },
      {
        path: "/checkout",
        element: <CheckoutMobile />,
      },
    ],
  },
]);
export default routerMobile;
