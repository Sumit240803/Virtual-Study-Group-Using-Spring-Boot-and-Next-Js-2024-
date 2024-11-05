"use client";

import { getToken } from '@/app/lib/getToken';
import Header from '@/app/ui/Header';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Import RichTextEditor dynamically to prevent SSR issues
const RichTextEditor = dynamic(() => import('@/app/ui/QuillEditor'), { ssr: false });

const Page = () => {
  const [noteContent, setNoteContent] = useState('');
  const [subject, setSubject] = useState('');
  const router = useRouter();
  const handleSave = async () => {
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addNote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject : subject, notes: noteContent }), // Pass subject state here
      });

      if (response.ok) {
        console.log('Note saved successfully');
        router.replace("/pages/user/profile")
      } else {
        console.error('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen text-black'>
      <Header />
      <div className='p-4'>
        <label htmlFor='topic' className='block text-lg mb-2'>Topic</label>
        <input 
          id='topic' 
          name='topic' 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} // Update subject state
          placeholder='Enter the Topic of your note..'
          className='border rounded p-2 w-full mb-4' // Add some styling
        />
        <div className='py-10'>
          <RichTextEditor onChange={setNoteContent} />
        </div>
        <div className='m-auto w-fit'>

        <button 
          onClick={handleSave} 
          className='bg-blue-500 text-white  px-4 py-2 rounded hover:bg-blue-600'
          >
          Save
        </button>
          </div>
      </div>
    </div>
  );
};

export default Page;
