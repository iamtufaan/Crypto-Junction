import React, { useContext } from 'react'
import { Coin } from '../context/CryptoContext'
import Carousel from './Carousel'

const Header = () => {


  return (
    <div className=' w-full h-[45vh] ' style={{backgroundImage:`url('../../public/header.jpg')`,backgroundPosition:'center'}}>
      <h1 className=' font-bold lg:text-9xl md:text-6xl sm:text-5xl text-4xl text-yellow-500 text-center py-3'>Crypto Junction </h1>
      <p className=' md:text-2xl  text-[16px]  text-gray-400 py-3 text-center'>Get all the Info regarding your favorite Crypto Currency</p>
<Carousel/>
      
    </div>
  )
}

export default Header
