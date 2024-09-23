import React, { useState } from 'react'
import { FaCrown } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Leaderboard = ({ allUsers }) => {
    const [arr, setArr] = useState([1, 2, 3, 4, 5])
    const navigate = useNavigate();

  return (
    <div className='w-full flex flex-col justify-start items-start gap-2 mt-2 mb-4'>
            {
                !allUsers ?
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

                    )
                    :
                    (
                        allUsers.sort((a, b) => a.rank - b.rank).map((item, key)=>(
                            <div key={key} className='w-full flex justify-start items-center gap-4 h-[80px] relative bg-zinc-100 hover:bg-zinc-300 rounded-md pl-4 '>
                                {
                                    item.rank === 1 ? (
                                        <FaCrown fill='gold'/>
                                    ): item.rank === 2 ? (
                                        <FaCrown fill='silver'/>
                                    ): item.rank === 3 ? (
                                        <FaCrown fill='rgb(205, 127, 50)'/>
                                    ): (
                                        "🎖️"
                                    )
                                }
                                <span className='font-bold text-teal-400 ml-4'>{item.rank}</span>
                                <img src={item.imageUrl} alt="img" className='w-[50px] h-[50px] border-2 rounded-full border-gray-400 ml-3'/>
                                <div className='flex flex-col justify-center items-start'>
                                    <span className='text-lg font-bold text-teal-800 tracking-wider'>{item.name}</span>
                                    <span className='font-semibold text-gray-500 text-md'>Points: {item.points}</span>
                                </div>
                                <FaHistory fill='black' className='absolute right-3 mr-3 cursor-pointer w-[20px] h-[20px]' onClick={()=>{navigate(`/History/${item._id}`)}}/>
                            </div>
                        ))
                    )
            }
        </div>
  )
}

export default Leaderboard
