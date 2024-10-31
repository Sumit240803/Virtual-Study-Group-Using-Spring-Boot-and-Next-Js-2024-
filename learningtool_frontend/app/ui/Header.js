import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between p-6 border-b-2 border-green-700'>
        <div className='text-6xl text-green-900'>Easy Academics</div>
        <div className='flex justify-between text-2xl'>
            <div className='m-2 p-2 border border-green-400 bg-green-700 text-white font-bold'>Login</div>
            <div className='m-2 p-2 border border-green-400 bg-green-700 text-white font-bold'>Register</div>
        </div>
    </div>
  )
}

export default Header