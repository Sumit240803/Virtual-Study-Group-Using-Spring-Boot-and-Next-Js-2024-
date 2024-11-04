import Link from 'next/link'
import React, { useState } from 'react'
import { getToken } from '../lib/getToken';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const getNotes = async()=>{
        try {
            const token = getToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/myNotes`,{
            method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
        })
        if(response.ok){
            const data = response.json();
            setNotes(data.notes);
        }else{
            console.log("ERROR")
        }
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div>
        <div className='text-lg font-semibold text-blue-200'>Your Notes<Link  className='text-green-200 pl-6 items-center' href={"/pages/user/notes/create"}>Create</Link></div>
        <div className='custom-scrollbar h-44 overflow-y-auto p-4 bg-gray-800 rounded-md'>
        {notes && notes.length > 0 ? (
                    notes.map((note) => (
                        <div key={note.id} className="my-4 p-4 bg-gray-700 rounded shadow">
                            <Link href={`/pages/user/profile/schedules/${note.id}`} className="text-2xl font-semibold text-blue-400">{note.subject}</Link>
                        </div>
                    ))
                ) : (
                    <p className="text-white my-10">No Notes right now</p>
                )}
        </div>
    </div>
  )
}

export default Notes