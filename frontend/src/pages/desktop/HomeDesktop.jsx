import React from 'react'
import HeaderDesktop from '../../components/desktop/HeaderDesktop'
import HDesktop from '../../components/desktop/h'
import SlideBar from '../../components/desktop/SidebarDesktop'
import './HomeDesktop.css'

const HomeDesktop = () => {
  return (
    <div>
      <div className='Body'>
        <SlideBar></SlideBar>
        <HDesktop></HDesktop>
      </div>
    </div>
  )
}

export default HomeDesktop
