import { createBrowserRouter } from "react-router-dom"
import App from "../App.jsx";
import HomeMobile from "../pages/mobile/HomeMobile.jsx";
import DashboardMobile from "../pages/mobile/DashboardMobile.jsx";
import LoginMobile from "../pages/mobile/LoginMobile.jsx";


const routerMobile = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomeMobile/>
            },
            {
                path: "/dashboard",
                element: <DashboardMobile/>
            },
            {
                path: "/login",
                element: <LoginMobile/>
            }

        ]
    }
]);
export default routerMobile;
