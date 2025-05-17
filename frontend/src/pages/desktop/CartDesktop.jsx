import React from 'react'
import Cart from '../../components/desktop/Cart/CartDesktop'
import SlideBar from '../../components/desktop/SidebarDesktop'
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
