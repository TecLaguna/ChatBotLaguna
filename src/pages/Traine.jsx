import React from 'react'
import Train from '../components/Train'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
const Traine = () => {
  return (
    <div>
        <Navbar />
        <SideBar />
        <main className='bg-gray-100'>
            <Train />
        </main>
    </div>
  )
}

export default Traine