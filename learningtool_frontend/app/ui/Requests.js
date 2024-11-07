"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getToken } from '../lib/getToken';

const Requests = () => {
  const[myFriends , setMyFriends]  = useState([]);
  const friends = async()=>{
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/friends`,{
        method : "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      if(response.ok){
        const data = await response.json();
        setMyFriends(data.friends);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    friends();
  },[])
  return (
    <div className='' >
      <div className='flex flex-row justify-center items-center'>
        <h1 className='pr-4 text-blue-200 font-semibold text-lg'>Friends</h1>
        <Link className='text-green-200 font-semibold text-lg' href={"/pages/user/search"}>Search A Friend</Link>
      </div>
    
      <div className='custom-scrollbar overflow-y-auto h-44 text-center bg-gray-800 '>
          <div className='text-white my-2 rounded-lg bg-gray-700 shadow p-4 font-semibold text-xl'>{myFriends ? myFriends.map((friend)=>(
            <div key={friend}>
              <div className='text-blue-400'> {friend} </div>
            </div>
          )) : <div className='text-blue-400 font-semibold text-xl'>You currently don't have friends.</div>}</div>
       
      </div>
     

    </div>
  )
}

export default Requests