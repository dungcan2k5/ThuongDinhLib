import React from "react";
import HeaderMobile from "../../components/mobile/HeaderMobile/HeaderMobile.jsx";
import "./MainLayoutMobile.css";
import { Outlet } from "react-router-dom";
import FooterMobile from "../../components/mobile/FooterMobile/FooterMobile.jsx";
const MainLayoutMobile = () => {
  return (
    <>
      <HeaderMobile />
      <main className="main__mobile">
        <Outlet />
      </main>
      <FooterMobile />
    </>
  );
};

export default MainLayoutMobile;
