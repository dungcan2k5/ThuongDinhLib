import React from "react";
import HeaderMobile from "../../components/mobile/HeaderMobile/HeaderMobile.jsx";
import "./MainLayoutMobile.css";
import { Outlet } from "react-router-dom";
import FooterMobile from "../../components/mobile/FooterMobile/FooterMobile.jsx";
import { AuthProvider } from "../../context/AuthContext.jsx";
const MainLayoutMobile = () => {
  return (
    <AuthProvider>
      <HeaderMobile />
      <main className="main__mobile">
        <Outlet />
      </main>
      <FooterMobile />
    </AuthProvider>
  );
};

export default MainLayoutMobile;
