"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    try {
      const response = await fetch(`https://virtual-study-group-using-spring-boot.onrender.com/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data =await response.json();
        localStorage.setItem('token', data.message);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Login successful');
        router.replace("/pages/user/profile")
        // Handle successful login, e.g., redirect or display message
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='bg-gray-900 min-h-screen'>
      <div>
        <div className='text-6xl text-green-200 text-center border-b-2 border-black p-4 shadow-sm shadow-black'>
          Easy Academics
        </div>
      </div>
      <div className='border-2 border-green-800 rounded-lg w-96 h-auto m-auto my-16 text-white p-8'>
        <form className='flex flex-col w-full' onSubmit={handleSubmit}>
          <div className='flex flex-col p-5 text-xl text-white shadow-sm shadow-black'>
            <label>Username</label>
            <input
              name="username"
              placeholder='Enter your username'
              className='bg-white bg-opacity-20 text-white placeholder-white p-2 rounded focus:outline-none focus:shadow-sm focus:shadow-white'
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col p-5 text-xl text-white shadow-sm shadow-black'>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder='Enter your Password'
              className='bg-white bg-opacity-20 text-white placeholder-white p-2 rounded focus:outline-none focus:shadow-sm focus:shadow-white'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className='text-center p-5'>
            <button type="submit" className='p-2 rounded-lg bg-green-200 text-green-950'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
