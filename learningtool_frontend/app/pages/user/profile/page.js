"use client"
import { getToken } from '@/app/lib/getToken'
import { getUser } from '@/app/lib/getUserDetails';
import { isExpired } from '@/app/lib/verifyToken';
import Header from '@/app/ui/Header';
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
            <div className='flex justify-around py-20'>
            <div>Schedules</div>
            <div>Notes</div>
            </div>
            <div className='flex justify-around py-20'>
            <div>Requests</div>
            <div>Groups</div>
            </div>
        </div>
    </div>
  )
}

export default page