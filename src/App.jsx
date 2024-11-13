import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar'
import CoinPage from './pages/CoinPage.jsx'

const App = () => {
  return (
    <div className=' w-full min-h-screen bg-[#14161A] text-white'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coin/:id' element={<CoinPage/>} />
      </Routes>
    </div>
  )
}

export default App
