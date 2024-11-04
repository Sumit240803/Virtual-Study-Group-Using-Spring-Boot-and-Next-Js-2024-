"use client"
import { getToken } from '@/app/lib/getToken'
import { getUser } from '@/app/lib/getUserDetails';
import { isExpired } from '@/app/lib/verifyToken';
import Header from '@/app/ui/Header';
import Notes from '@/app/ui/Notes';
import Schedules from '@/app/ui/Schedules';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const [userDetails,setUserDetails] = useState(null);
    const router = useRouter();

    useEffect(()=>{
        const token = getToken();
        if(token && !isExpired(token)){
            const user = getUser();
            setUserDetails(user);
            console.log(userDetails);
        }else{
            router.replace("/")
        }
    },[router]);

    useEffect(() => {
        // Log userDetails when it changes
        if (userDetails) {
            console.log('User details:', userDetails);
        }
    }, [userDetails]); // This effect runs whenever userDetails changes

  return (
    <div>
        <div>
        <Header/>
        </div>
        <div>
            <div className='flex justify-around py-16'>
            <div className='border-2 text-center bg-gray-800 rounded-lg w-1/3 shadow-lg shadow-blue-300 border-black min-h-44  py-2'>

            <Schedules/>
            </div>
            <div className='border-2 text-center bg-gray-800 rounded-lg w-1/3 shadow-lg shadow-blue-300 border-black min-h-44 px-10 py-2'><Notes/></div>
            </div>
            <div className='flex justify-around py-16'>
            <div className='border-2 text-center bg-gray-800 rounded-lg w-1/3 shadow-lg shadow-blue-300 border-black min-h-44 px-10 py-2'>Requests</div>
            <div className='border-2 text-center bg-gray-800 rounded-lg w-1/3 shadow-lg shadow-blue-300 border-black min-h-44 px-10 py-2'>Groups</div>
            </div>
        </div>
    </div>
  )
}

export default page