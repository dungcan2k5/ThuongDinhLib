import { useState } from 'react'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
    <MainLayout/>
    <Outlet/>
    </>
  )
}

export default App
