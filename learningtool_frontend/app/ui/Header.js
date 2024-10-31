import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-6 border-b-2 border-green-700 shadow-lg shadow-green-300'>
        <div className='text-6xl text-green-900'>Easy Academics</div>
        <div className='flex justify-between text-2xl'>
            <div className='m-2 p-2 border border-green-400 bg-green-700 text-white font-bold shadow-md shadow-gray-600'>Login</div>
            <div className='m-2 p-2 border border-green-400 bg-green-700 text-white font-bold shadow-md shadow-gray-600'>Register</div>
        </div>
    </div>
  )
}

export default Header