import Link from 'next/link'
import React from 'react'

const Groups = () => {
  return (
    <div>
        <div className='text-blue-400 text-lg font-semibold'>
            Groups
            <Link href={"/pages/user/profile/groups/create"} className='text-lg font-semibold text-green-200 pl-6'>Create</Link>
        </div>
    </div>
  )
}

export default Groups