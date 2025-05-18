import HeaderDesktop from '../../components/desktop/header/HeaderDesktop';
import FooterDesktop from '../../components/desktop/footer/FooterDesktop';
import './LayoutDesktop.css'
import { useLocation, Outlet } from 'react-router-dom';

const MainLayoutDesktop = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';
  return (
    <div className="layout">
      {!hideHeader && <HeaderDesktop/>}
      <main>
        <Outlet />
      </main>
      {!hideHeader && <FooterDesktop/>}
    </div>
  );
}

export default MainLayoutDesktop
