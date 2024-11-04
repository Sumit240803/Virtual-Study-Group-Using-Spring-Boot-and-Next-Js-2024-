"use client"
import React, { useEffect, useState } from 'react';
import { getToken } from '../lib/getToken';
import Link from 'next/link';

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);

    const fetchSchedules = async () => {
        try {
            const token = getToken();
            if (!token) {
                console.log("Schedules: Token Not found");
                return;
            }
            console.log("Token logged from Schedules", token);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mySchedules`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setSchedules(data.schedules);
            } else {
                console.log('Error fetching schedules');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    return (
        <div>
            <div className='text-lg font-semibold text-blue-200'>
                Your Schedules
                <Link href={'/pages/user/profile/schedules/create'} className='text-green-200 pl-6 items-center'>
                    Create
                </Link>
            </div>
            <div className="custom-scrollbar h-44 overflow-y-auto p-4 bg-gray-800 rounded-md">
                {schedules && schedules.length > 0 ? (
                    schedules.map((schedule) => (
                        <div key={schedule.id} className="my-4 p-4 bg-gray-700 rounded shadow">
                            <Link href={`/pages/user/profile/schedules/${schedule.id}`} className="text-2xl font-semibold text-blue-400">{schedule.name}</Link>
                            <p className="text-lg text-white">{schedule.note}</p>
                            <p className="text-md text-gray-400">Start: {new Date(schedule.start).toLocaleString()}</p>
                            <p className="text-md text-gray-400">End: {new Date(schedule.end).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-white my-10">No Schedules right now</p>
                )}
            </div>

        </div>
    );
};

export default Schedules;
