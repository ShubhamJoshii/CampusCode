import React from 'react'
import Header from './components/Header/Header'
import SideNavbar from './components/SideNavbar/SideNavbar'

const Wrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 flex flex-col">
      <Header />
      <section className='wrapperSection'>
        <SideNavbar />
        {children}
      </section>
    </div>
  )
}

export default Wrapper