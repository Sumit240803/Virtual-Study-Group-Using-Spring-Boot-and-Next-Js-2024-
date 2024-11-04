"use client"
import { getToken } from '@/app/lib/getToken';
import Header from '@/app/ui/Header';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreateScheduleForm = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    note: '',
    start: '',
    end: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
        const token = getToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addSchedule`,{
            method : "POST",
            body : JSON.stringify(formData),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }

        })
        if(response.ok){
            router.replace("/pages/user/profile")
        }else{
            console.log("Error")
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className='min-h-screen bg-black'>
    <div><Header/></div>
    <div className="max-w-md mx-auto mt-6 bg-gray-100 p-4 shadow-lg shadow-green-600 rounded-lg ">
      <h2 className="text-2xl font-bold mb-4">Create A Schedule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            />
        </div>

        <div>
          <label htmlFor="scheduleNote" className="block text-lg font-medium">Schedule Note</label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
            />
        </div>

        <div>
          <label htmlFor="startDate" className="block text-lg font-medium">Start Date</label>
          <input
            type="date"
            id="start"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-lg font-medium">End Date</label>
          <input
            type="date"
            id="end"
            name="end"
            value={formData.end}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            />
        </div>

        <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded font-bold">
          Submit
        </button>
      </form>
    </div>
            </div>
  );
};

export default CreateScheduleForm;
