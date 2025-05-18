import HDesktop from '../../components/desktop/homeComponent/h'
import SlideBar from '../../components/desktop/sidebar/SidebarDesktop'
import Banner from '../../components/desktop/homeComponent/banner'
import RegisterRecommend from '../../components/desktop/homeComponent/registerRecommend'
import './HomeDesktop.css'

const HomeDesktop = () => {
  return (
    <div>
      <div className='Body'>
        <SlideBar></SlideBar>
        <div className='content'>
          <Banner></Banner>
          <HDesktop></HDesktop>
          <RegisterRecommend></RegisterRecommend>
        </div>
      </div>
    </div>
  )
}

export default HomeDesktop
