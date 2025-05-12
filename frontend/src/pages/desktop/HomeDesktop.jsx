import React from 'react'
import HeaderDesktop from '../../components/desktop/HeaderDesktop'
import HDesktop from '../../components/desktop/homeComponent/h'
import SlideBar from '../../components/desktop/SidebarDesktop'
import Banner from '../../components/desktop/homeComponent/banner'
import RegisterRecoment from '../../components/desktop/homeComponent/registerRecoment'
import './HomeDesktop.css'

const HomeDesktop = () => {
  return (
    <div>
      <div className='Body'>
        <SlideBar></SlideBar>
        <div className='content'>
          <Banner></Banner>
          <HDesktop></HDesktop>
          <RegisterRecoment></RegisterRecoment>
        </div>
      </div>
    </div>
  )
}

export default HomeDesktop
