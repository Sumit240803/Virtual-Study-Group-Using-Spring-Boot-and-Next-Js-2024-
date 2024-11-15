"use client"
import { getToken } from '@/app/lib/getToken';
import ChatComponent from '@/app/ui/Chat';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const {group} = useParams();
  return group ? <ChatComponent groupId={group} />  : <p>Loading..</p>
}

export default Page