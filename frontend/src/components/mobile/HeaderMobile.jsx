import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import'./HeaderMobile.css'

const HeaderMobile = () => {
  return (
    <header className="header__mobile">
        <nav className='header__mobile--nav'>
            {/* left side */}
            <div className='header__mobile--left'>
              <Link to="/">
              <FaBars  className='header__mobile--bar--icon'/> 
              </Link>
              <div className='header__mobile--search'>
              <IoIosSearch  className='header__mobile--search--icon'/>
              <input type="text" placeholder='        Tìm kiếm' className='header__mobile--input' />
              </div>
            </div>
            {/* right side */}
            <div>Account</div>
        </nav>
    </header>
  )
}

export default HeaderMobile
