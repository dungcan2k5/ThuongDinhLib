import React from 'react'
import Cart from '../../components/desktop/Cart/Cart'
import SlideBar from '../../components/desktop/sidebar/SidebarDesktop'
import './DashBoardDesktop.css'
const CartDesktop = () => {
  return (
    <div className='Body'>
        <SlideBar></SlideBar>
        <div className='content'>
          <Cart></Cart>
        </div>
      </div>
  )
}

export default CartDesktop
