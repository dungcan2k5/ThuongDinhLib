import useResponsive from '../hooks/useResponsive';
import MainLayoutDesktop from './desktop/MainLayoutDesktop';
import MainLayoutMobile from './mobile/MainLayoutMobile';

export default function MainLayout() {
  const isMobile = useResponsive();

  return isMobile ? <MainLayoutMobile /> : <MainLayoutDesktop />;
}
