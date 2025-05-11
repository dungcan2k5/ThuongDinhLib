import React from "react";
import NewsMobile from "../NewsMobile/NewsMobile";
import PopularMobile from "../PopularMobile/PopularMobile";
import RecommendMobile from "../RecommendMobile/RecommendMobile";
import MemberMobile from "../MemberMobile/MemberMobile";

const HomeMobile = () => {
  return (
    <>
      <NewsMobile />
      <PopularMobile />
      <RecommendMobile />
      <MemberMobile />
    </>
  );
};

export default HomeMobile;
