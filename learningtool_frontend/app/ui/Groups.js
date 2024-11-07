"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getToken } from '../lib/getToken'

const Groups = () => {
  const [groups, setMyGroups] = useState([]);
  const joinedGroups = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joinedGroups`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json();
        setMyGroups(data.group);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    joinedGroups();
  },[])

  return (
    <div>
      <div className='text-blue-400 text-lg font-semibold'>
        Groups
        <Link href={"/pages/user/profile/groups/create"} className='text-lg font-semibold text-green-200 pl-6'>Create</Link>
      </div>
      <div className='custom-scrollbar h-44 overflow-y-auto p-4 bg-gray-800 rounded-md'>
        {groups ? groups.map((group) => (
          <div key={group.id} className="my-4 p-4 bg-gray-700 rounded shadow">
            <Link href={`/pages/user/profile/groups/${group.id}`} className="text-2xl font-semibold text-blue-400">{group.name}</Link>
          </div>
        )) : (
          <p className="text-white my-10">No Groups joined right now</p>
      )}
      </div>
    </div>
  )
}

export default Groups