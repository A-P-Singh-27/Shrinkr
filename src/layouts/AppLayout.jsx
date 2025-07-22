import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div>
      <main className='min-h-screen container'>
        {/* Header */}
        <Header/>
        {/* body */}
        <Outlet />
      </main>

      {/* footer */}
      {/* <div className='p-10 text-center bg-gray-800 m-10 text-white'>
        Made with by A.P Singh
      </div> */}
      <Footer/>
    </div>
  )
}
