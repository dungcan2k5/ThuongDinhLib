import HDesktop from '../../components/desktop/homeComponent/h'
import SlideBar from '../../components/desktop/sidebar/SidebarDesktop'
import Banner from '../../components/desktop/homeComponent/banner'
import RegisterRecommend from '../../components/desktop/homeComponent/registerRecommend'
import Recommend from '../../components/desktop/homeComponent/recommend'
import './HomeDesktop.css'

const HomeDesktop = () => {
  return (
    <div>
      <div className='Body'>
        <SlideBar></SlideBar>
        <div className='content'>
          <div className='content__container'>
          <Banner></Banner>
          <Recommend></Recommend>
          </div>
          <HDesktop></HDesktop>
          <RegisterRecommend></RegisterRecommend>
        </div>
      </div>
    </div>
  )
}

export default HomeDesktop
