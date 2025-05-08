import { useState } from 'react'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login'; // thêm path để ẩn header

  return (
    <>
      { !hideHeader && <MainLayout /> } 
      <Outlet />
    </>
  )
}

export default App

