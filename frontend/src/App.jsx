import { useState } from 'react'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  // thêm path để ẩn header
  const hideHeader = ['/login', '/register'].includes(location.pathname);


  return (
    <>
      { !hideHeader && <MainLayout /> } 
      <Outlet />
    </>
  )
}

export default App

