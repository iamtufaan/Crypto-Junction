import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className=' w-full h-screen flex items-center justify-center'>
      <ClipLoader
  color="yellow"
  size={50}
/>
    </div>
  )
}

export default Loader
