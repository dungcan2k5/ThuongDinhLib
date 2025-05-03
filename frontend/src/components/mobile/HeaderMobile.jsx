import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import'./compo-mobile.css'

const HeaderMobile = () => {
  return (
    <header className="header__mobile">
        <nav className='header__mobile--nav'>
            {/* left side */}
            <div>
              <Link to="/">
              <FaBars />
              </Link>
            </div>
            {/* right side */}
            <div>Account</div>
        </nav>
    </header>
  )
}

export default HeaderMobile
