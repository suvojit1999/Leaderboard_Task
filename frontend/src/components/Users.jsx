import React, { useContext, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from 'react-toastify';
import { UpdateContext } from '@/updateContext/UpdateContext';


const Users = ({ allUsers }) => {
    const [arr, setArr] = useState([1, 2, 3, 4, 5])
    const {update, setUpdate} = useContext(UpdateContext)
    

    const ClaimPoints = async (id) => {
        try{
            // const response = await fetch(`http://localhost:3000/claimPoints/${id}`)
            const response = await fetch(`https://leaderboard-task-beta.vercel.app/claimPoints/${id}`)
            const data = await response.json()
            console.log(data)

            if (response.ok) {
                toast.success(data.message);
                setUpdate(!update)
              } else {
                toast.error(data.error);
              }

        }catch(err){
            console.error(err);
            toast.error(err.error);
        }
    }

    return (
        <div className='w-full flex flex-col justify-start items-start gap-2'>
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
                        allUsers.map((item, key)=>(
                            <div key={key} className='w-full flex justify-start items-center gap-4 h-[80px] relative bg-zinc-100 hover:bg-zinc-300 rounded-md'>
                                <img src={item.imageUrl} alt="img" className='w-[50px] h-[50px] border-2 rounded-full border-gray-400 ml-3'/>
                                <div className='flex flex-col justify-center items-start'>
                                    <span className='text-lg font-bold text-teal-800 tracking-wider'>{item.name}</span>
                                    <span className='font-semibold text-gray-500 text-md'>Points: {item.points}</span>
                                </div>
                                <button className='bg-teal-400 px-2 py-1 rounded-md text-white font-semibold absolute right-3' onClick={()=>{ClaimPoints(item._id)}}>Claim Points</button>
                            </div>
                        ))
                    )
            }
        </div>
    )
}

export default Users
