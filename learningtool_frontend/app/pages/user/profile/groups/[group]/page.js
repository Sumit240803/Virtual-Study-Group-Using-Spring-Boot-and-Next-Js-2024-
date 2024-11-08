"use client"
import ChatComponent from '@/app/ui/Chat';
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const {group} = useParams();

  return group ? <ChatComponent groupId={group}/> : <p>"Loading.."</p>
}

export default page