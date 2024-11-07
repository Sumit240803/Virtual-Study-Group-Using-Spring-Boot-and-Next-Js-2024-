import Header from '@/app/ui/Header'
import React from 'react'

const page = () => {
  return (
    <div>
        <div><Header/></div>
        <div>
          <div className='text-center text-2xl font-bold text-blue-500 mt-3'>Chemistry</div>

          <div className='w-2/3 m-auto px-5 py-2 mt-5 rounded-xl  min-h-96 bg-gray-800'>
          <div className='w-full my-3 bg-gray-700 min-h-96 m-auto '>
            <strong>User</strong> Hello From User
          </div>
          <input></input>
          </div>

        </div>
    </div>
  )
}

export default page