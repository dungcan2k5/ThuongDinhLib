import useResponsive from "../hooks/useResponsive";
import LayoutDesktop from "./desktop/LayoutDesktop";
import MainLayoutMobile from "./mobile/MainLayoutMobile";

export default function MainLayout() {
  return isMobile ? <MainLayoutMobile /> : <MainLayoutDesktop />;
}
