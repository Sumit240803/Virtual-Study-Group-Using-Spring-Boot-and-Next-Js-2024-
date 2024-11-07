"use client"
import { getToken } from '@/app/lib/getToken';
import Header from '@/app/ui/Header'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [myFriends, setMyFriends] = useState([]);
    const [members, setMembers] = useState([]);
    const [membersId , setMembersId] = useState([]);
    const[name , setName] = useState('');
    const friends = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/friends`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            })
            if (response.ok) {
                const data = await response.json();
                setMyFriends(data.friends);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        friends();
    }, [])
    const addMember = async(username) => {
        try {
            const token = getToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/searchByUsername?query=${username}`,{
                method : "GET",
                headers : {
                    "Authorization": `Bearer ${token}`,
                },
                
            })
            if(response.ok){
                const data = await response.json();
                setMembers((prev) => {
                    if (members.includes(username)) {
                        return prev;
                    }
        
                    return [...prev, username];
                }
                )
                setMyFriends((prev) => prev.filter(member => member !== username));
                setMembersId((prev)=>{
                    if(membersId.includes(data.userId)){
                        return prev;
                    }

                    return [...prev , data.userId]
                })
                
            }
        } catch (error) {
            
        }
        
        
    }
    const removeMember = (username) => {
        setMembers((prev) => prev.filter(member => member !== username));
        setMyFriends((prev) => {
            if (myFriends.includes(username)) { return prev }
            return [...prev, username]
        });
    }
    const createGroup = async()=>{
        try {
            const token = getToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/group/addGroup`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({name : name , members : membersId})
            })
            if(response.ok){
                console.log("Group Added")
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
            <div className='mt-10 p-5 w-1/3 m-auto border border-gray-500 rounded bg-gray-800 items-center text-blue-400 '>
                <div className='w-fit p-2 m-auto'>
                   
                    <input value={name} onChange={(e)=>setName(e.target.value)} className='text-center bg-transparent rounded-full border border-gray-500 p-2 text-green-500 ' name='name' id='name' type='text' placeholder='Group Name'></input>
                </div>
                <div className='p-2 text-center'>
                    <div className='text-center mt-2'>Members</div>
                    <div className='border mt-4 w-1/3 m-auto border-gray-500 p-5 min-h-10'>

                    
                    <div>{members ? members.map((member) => (
                        <div key={member} className='flex flex-row'>
                            <div>
                                {member}
                            </div>
                            <button className='pl-2 text-red-400' onClick={() => removeMember(member)}>Remove</button>
                        </div>
                    )) : ("No Members in the group Right now")}</div>
                    </div>
                    <div className='mt-2'>Add Member</div>
                    <div className='border m-auto w-1/3 border-gray-500 p-3 min-h-10 my-4'>

                    {myFriends ? (myFriends.map((friend) => (
                        <div key={friend}>
                            <button className='text-green-400 font-semibold' onClick={() => addMember(friend)}>{friend}</button>
                        </div>
                    ))) : ("")}
                    </div>
                </div>
                <div className='p-2  border border-gray-500 rounded-lg bg-gray-700 w-fit m-auto text-green-500'>
                    <button onClick={createGroup}>Create</button>
                </div>
            </div>
        </div>
    )
}

export default page