import React from 'react'
import OrderHistory from '../../components/desktop/orderHistory/orderHistory'
import SlideBar from '../../components/desktop/sidebar/SidebarDesktop'
const HistoryDesktop = () => {
  return (
    <div className='Body'>
        <SlideBar></SlideBar>
        <div className='content'>
          <OrderHistory></OrderHistory>
        </div>
      </div>
  )
}

export default HistoryDesktop
