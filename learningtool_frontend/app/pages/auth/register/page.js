"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(formData);
    
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Data submitted successfully');
        router.replace("/pages/auth/login")
        // Reset form or handle success message here
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='bg-gray-900 min-h-screen flex flex-col items-center'>
      <div className='w-full'>
        <div className='text-6xl text-blue-200 text-center border-b-2 border-black p-4 shadow-sm shadow-blue-800'>
          Easy Academics
        </div>
      </div>
      <div className='border-2 border-blue-800 rounded-lg w-96 m-auto my-16 text-white p-8'>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          {['name', 'username', 'email', 'password'].map((field) => (
            <div key={field} className='flex flex-col p-3 text-xl shadow-sm shadow-blue-800'>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={`Enter your ${field}`}
                className='bg-white bg-opacity-20 text-white placeholder-white p-2 rounded focus:outline-none focus:shadow-sm focus:shadow-blue-400'
                value={formData[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className='text-center mt-6'>
            <button type='submit' className='px-6 py-2 rounded-lg bg-blue-200 text-blue-900 font-semibold hover:bg-blue-300'>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
