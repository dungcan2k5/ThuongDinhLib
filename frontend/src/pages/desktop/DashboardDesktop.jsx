import React from 'react'
import UserDashboard from '../../components/desktop/userDashboard/UserDashboard'
import SlideBar from '../../components/desktop/sidebar/SidebarDesktop'
import './DashBoardDesktop.css'
const DashboardDesktop = () => {
  return (
    <div className='Body'>
        <SlideBar></SlideBar>
        <div className='content'>
          <UserDashboard></UserDashboard>
        </div>
      </div>
  )
}

export default DashboardDesktop
