"use client"
import { getToken } from '@/app/lib/getToken';
import Header from '@/app/ui/Header'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState('');
  const[requests , setRequests] = useState([]);
  const[myFriends , setMyFriends]  = useState([]);
  const search = async () => {
    if(typeof window ==='undefined') return;
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/searchByUsername?query=${query}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }

      )
      if (response.ok) {
        const data = await response.json();
        setUsername(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const sendRequest = async () => {
    if(typeof window ==='undefined') return;
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sendRequest`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username : username})
      })
      if (response.ok) {
        alert("Request Sent")
        setQuery('')
        setUsername('');
      }
    } catch (error) {

    }
  }
  const myRequests = async()=>{
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`,{
        method : "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
       
        }
      })
      if(response.ok){
        const data = await response.json();
        setRequests(data.requests);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    myRequests();
    friends();
  },[])

  const accept = async(request)=>{
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acceptRequest`,{
        method : "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username : request})
        
      })
      if(response.ok){
        alert("Request Accepted");
      }
    } catch (error) {
      console.log(error);
    }
  }
  const reject = async(request)=>{
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rejectRequest`,{
        method : "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username : request})
        
      })
      if(response.ok){
        alert("Request Rejected");
      }
    } catch (error) {
      console.log(error);
    }
  }
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
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className='flex justify-between'>

      <div className='flex flex-col w-1/3  p-4  m-10'>
        <div className='border border-gray-500 rounder-lg min-h-20 flex justify-around bg-gray-800 text-blue-400'>
          <input className='focus:outline-none bg-transparent text-xl' type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search username'></input>
          <button className='font-bold text-xl' onClick={search}>Search</button>
        </div>
        <div className='w-10 border border-gray-500 rounded-full text-center p-4 mt-2 min-w-56 mx-auto bg-gray-800 text-blue-400 text-lg '>
          {username ? <div className='flex flex-row justify-between p-2'>
            <div className='font-semibold'>{username}</div>
            <button className='font-bold text-white' onClick={sendRequest}>Send Request</button>
          </div> : "No Username"}
        </div>
        <div className='border border-gray-500 bg-gray-800 min-h-56 mt-3'>
          <div className='text-green-400 py-2 font-bold text-center text-2xl'>Friend Requests</div>
          <div className='text-blue-400 '>
            {requests ? requests.map((request)=>(
              <div className='custom-scrollbar overflow-y-auto flex flex-row p-3 justify-center items-center mt-2 border border-gray-500 w-fit m-auto rounded-full' key={request}>
                <div className='font-bold text-xl'> {request}</div> 
                <div className='pl-4 '>
                <button onClick={()=>accept(request)} className='px-4 font-semibold text-green-600'>Accept</button>
                <button onClick={()=>reject(request)} className='px-4 font-semibold text-red-500'>Reject</button>
                </div>
             
              </div>
            ))
              
             : ( <div className='text-center font-bold'>No requests Right Now</div>)}
          </div>
        </div>
      </div>
      <div className='p-4 m-10 w-1/3 border border-gray-500 text-center bg-gray-800 min-h-96'>
        <div>
          <div className='font-bold text-lg text-blue-400'>Friends List</div>
          <div className='text-white'>{myFriends ? myFriends.map((friend)=>(
            <div key={friend}>
              <div> {friend} </div>
            </div>
          )) : <div>You currently don&apost have friends.</div>}</div>
        </div>
      </div>
      </div>

    </div>
  )
}

export default Page