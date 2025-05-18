import React from 'react'
import SearchPage from '../../components/searchPage/searchPage'
import SlideBar from '../../components/desktop/sidebar/SidebarDesktop'
import './DashBoardDesktop.css'
const SearchDesktop = () => {
  return (
    <div className='Body'>
        <SlideBar></SlideBar>
        <div className='content'>
          <SearchPage></SearchPage>
        </div>
      </div>
  )
}

export default SearchDesktop
