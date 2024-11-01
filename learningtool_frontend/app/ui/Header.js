"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getToken } from '../lib/getToken'
import { isExpired } from '../lib/verifyToken';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState(false);
  const token = getToken();
  useEffect(() => {
    if (token && !isExpired(token)) {
      setUser(true);
    }
  }, [token]);
  const logout = () => {
    localStorage.clear();
    setUser(false);
    router.replace("/");

  }
  return (
    <div className='flex justify-between p-6 border-b-2 border-blue-700 shadow-lg shadow-blue-300 bg-gray-800'>
      <div className='text-6xl text-blue-400'>Easy Academics</div>
      {user ? (<>
        <div className='flex justify-between text-2xl'>
          <Link href={"/pages/user/profile"} className='m-2 p-2 border border-blue-400 bg-blue-400 text-white font-bold shadow-md shadow-gray-600' >Profile</Link>
          <div className='m-2 p-2 border border-blue-400 bg-blue-400 text-white font-bold shadow-md shadow-gray-600'><button onClick={logout}>
            Logout
          </button>
          </div>
        </div>
      </>) : (
        <div className='flex justify-between text-2xl'>
          <Link href={"/pages/auth/login"}>
            <div className='m-2 p-2 border border-blue-400 bg-blue-700 text-white font-bold shadow-md shadow-gray-600'>Login</div>
          </Link>
          <Link href={"/pages/auth/register"}>
            <div className='m-2 p-2 border border-blue-400 bg-blue-700 text-white font-bold shadow-md shadow-gray-600'>Register</div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
