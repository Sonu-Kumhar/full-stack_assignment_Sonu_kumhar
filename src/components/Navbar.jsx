import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-cyan-600 shadow-md text-white py-2'>
        <div className='logo'>
            <span className='font-bold text-xl mx-8'>NotePilot</span>
        </div>
        <ul className='flex gap-5 mx-4'>
            <li className='cursor-pointer hover:font-bold hover:underline transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold hover:underline transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar