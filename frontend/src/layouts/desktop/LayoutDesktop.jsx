import HeaderDesktop from '../../components/desktop/HeaderDesktop';
// import FooterDesktop from '../../components/mobile/FooterDesktop';

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
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayoutDesktop
