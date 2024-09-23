import React, { useEffect, useState } from 'react'
import './App.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateContext } from './updateContext/UpdateContext';
import { Routes, Route } from 'react-router-dom';


import Users from './components/Users'
import Leaderboard from './components/Leaderboard'
import History from './pages/History';


function App() {
  const [allUsers, setAllUsers] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    getAllUsers()
  }, [])
  useEffect(() => {
    getAllUsers()
  }, [update])


  const getAllUsers = async () => {
    // const response = await fetch("http://localhost:3000/getData")
    const response = await fetch("https://leaderboard-task-beta.vercel.app/getData")
    const data = await response.json();
    setAllUsers(data);
    console.log(data)
  }


  return (
    <UpdateContext.Provider value={{ update, setUpdate }}>
      <Routes>
        <Route path='/' element={
          <div className='w-full flex flex-col justify-start items-center gap-4 h-[100vh]'>
            <h2 className='text-3xl font-bold text-teal-500 my-4'>Dashboard</h2>

            <div className='w-[96%] flex justify-center items-start '>
              <Tabs defaultValue="account" className="w-full flex flex-col justify-start items-start">
                <TabsList className="w-[300px] gap-4 ">
                  <TabsTrigger value="account" className="w-[45%]">Users</TabsTrigger>
                  <TabsTrigger value="password" className="w-[45%]">Leaderboard</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className=" w-full"><Users allUsers={allUsers} /></TabsContent>
                <TabsContent value="password" className=" w-full"><Leaderboard allUsers={allUsers} /></TabsContent>
              </Tabs>

            </div>
            <ToastContainer />
          </div>
        } />
        <Route path='/History/:id' element={
          <>
            <History />
            <ToastContainer />
          </>
        } />
      </Routes>

    </UpdateContext.Provider>
  )
}

export default App
