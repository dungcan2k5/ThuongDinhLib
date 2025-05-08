import HeaderDesktop from '../../components/desktop/HeaderDesktop';
// import FooterDesktop from '../../components/mobile/FooterDesktop';

import './LayoutDesktop.css'
import { Outlet } from 'react-router-dom';

const MainLayoutDesktop = () => {
  return (
    <div className="layout">
      <HeaderDesktop />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayoutDesktop
