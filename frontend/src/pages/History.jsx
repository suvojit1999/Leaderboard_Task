import { Skeleton } from '@/components/ui/skeleton'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { format } from 'date-fns';

const History = () => {
    const [User, setUser] = useState([])
    const [History, setHistory] = useState([])
    const [arr, setArr] = useState([1, 2, 3, 4, 5])
    const params = useParams()
    useEffect(() => {
        getHistory()
    }, [])

    const getHistory = async () => {

        try {
            // const response = await fetch(`http://localhost:3000/getHistory/${params.id}`);
            const response = await fetch(`https://leaderboard-task-beta.vercel.app/getHistory/${params.id}`);
            const { history, user } = await response.json();

            if (response.ok) {
                setUser(user);
                setHistory(history);
                console.log(user, history)
                toast.success("History fetched successfully!");
            } else {
                toast.error("Error fetching history.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching history.");
        }
    }

    const formatDate = (date) => {
        return format(new Date(date), "dd MMM yyyy");
    };
    const formatTime = (date) => {
        return format(new Date(date), "hh:mm:ss a");
    };
    
    return (
        <div className='w-full flex flex-col justify-start items-center gap-4 h-[100vh]'>
            <h2 className='text-3xl font-bold text-teal-500 my-4'>History</h2>
            {
                !User ?
                    (
                        arr.map((item, key) => (
                            <div className="flex items-center space-x-4 mt-5 w-full " key={key}>
                                <Skeleton className="h-[50px] w-[50px] rounded-full" />
                                <div className="space-y-2 w-[80%]">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </div>
                            </div>
                        ))
                    ) :
                    (
                        <>
                            <div className='w-[96%] md:w-[600px] lg:w-[600px] bg-gray-300 flex flex-col justify-center items-center gap-1 py-4 rounded-lg'>
                                <img src={User[0]?.imageUrl} alt="img" className='w-[100px] h-[100px] border-2 rounded-full border-gray-400 my-3'/>
                                <div className='font-bold text-lg'>Name: {User[0]?.name}</div>
                                <div className='font-bold text-md text-purple-500'>Rank: {User[0]?.rank}</div>
                                <div className='font-bold text-md text-orange-500'>Current Points: {User[0]?.points}</div>
                            </div>
                            <div className='flex flex-col justify-start items-center w-[96%] md:w-[600px] lg:w-[600px] bg-gray-200 h-[350px] rounded-lg overflow-auto'>
                                {
                                    History.map((item, key)=>(
                                        <div key={key} className='w-[96%] hover:bg-gray-300 flex flex-col justify-center items-center gap-1 py-4 rounded-lg my-2'>
                                            <div className='font-semibold text-teal-700'>Points: {item?.points}</div>
                                            <div className='font-semibold text-slate-600'>Climed on {formatDate(item?.date)} at {formatTime(item?.date)}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default History
