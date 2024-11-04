"use client"
import { getToken } from '@/app/lib/getToken';
import Header from '@/app/ui/Header'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [schedule, setSchedule] = useState([]);
  const router = useRouter();
  const { view } =useParams();
  const scheduleId = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedule/${view}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json();
        setSchedule(data.schedules);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    scheduleId();
  },[view])
  const deleteSchedule = async()=>{
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteSchedule/${view}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      })
      if(response.ok){
        router.replace("/pages/user/profile")
      }
    } catch (error) {
      
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div><Header /></div>
      <div>
        <div>{schedule ? (
          schedule.map((schedule) => (
            <div key={schedule.id} className="my-10 p-10 w-fit m-auto bg-gray-700 rounded shadow-lg shadow-blue-400 text-center ">
              <h3  className="text-2xl font-semibold text-blue-400">{schedule.name}</h3>
              <p className="text-lg text-white">{schedule.note}</p>
              <p className="text-md text-gray-400">Start: {new Date(schedule.start).toLocaleString()}</p>
              <p className="text-md text-gray-400">End: {new Date(schedule.end).toLocaleString()}</p>
              <button onClick={deleteSchedule}>Delete</button>
            </div>
          ))
        ) : ("")}</div>
      </div>
    </div>
  )
}

export default page