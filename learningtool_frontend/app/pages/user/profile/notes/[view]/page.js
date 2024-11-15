"use client"
import { getToken } from '@/app/lib/getToken';
import Header from '@/app/ui/Header'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const View = () => {
  const [note, setNote] = useState([]);
  const router = useRouter();
  const { view } =useParams();
  const noteId = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/notes/${view}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNote(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    noteId();
  },[view])
  

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div><Header /></div>
      <div>
        <div className='m-4'>{note ? (
          note.map((note) => (
            <div key={note.id} className="my-10 p-10 w-fit m-auto  rounded shadow-lg border border-gray-800 ">
              <h3  className="text-2xl font-semibold text-center py-5 text-blue-700">{note.subject}</h3>
              <p dangerouslySetInnerHTML={{__html : note.notes}} className="text-lg text-black"></p>
            </div>
          ))
        ) : ("")}</div>
      </div>
    </div>
  )
}

export default View