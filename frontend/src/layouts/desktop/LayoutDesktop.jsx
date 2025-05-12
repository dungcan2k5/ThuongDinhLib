import HeaderDesktop from '../../components/desktop/HeaderDesktop';
import FooterDesktop from '../../components/desktop/FooterDesktop';

import './LayoutDesktop.css'
import { Outlet } from 'react-router-dom';

const MainLayoutDesktop = () => {
  const hideHeader = location.pathname === '/login' || location.pathname ==='/register';
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
