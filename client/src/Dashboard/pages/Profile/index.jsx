import React from 'react'
import { useApp } from '../../hooks/useApp'

const Profile = () => {
     const {user} = useApp()
     console.log(user);
  return (
    <div className='bg-white h-[500px] flex justify-center items-center'>
      <div className='w-[20%]'>
          <div className='flex justify-between items-center'>
               <h2 className='text-xl font-semibold'>Name:</h2>
               <h3 className='text-lg'>{user?.user?.name}</h3>
          </div>
          <div className='flex justify-between items-center'>
               <h2 className='text-xl font-semibold'>UserName:</h2>
               <h3 className='text-lg'>{user?.username}</h3>
          </div>
          <div className='flex justify-between items-center'>
               <h2 className='text-xl font-semibold'>Email:</h2>
               <h3 className='text-lg'>{user?.user?.email}</h3>
          </div>
          <div className='flex justify-between items-center'>
               <h2 className='text-xl font-semibold'>Phone:</h2>
               <h3 className='text-lg'>{user?.user?.phone}</h3>
          </div>
          <div className='flex justify-between items-center'>
               <h2 className='text-xl font-semibold'>Role:</h2>
               <h3 className='text-lg'>{user?.user?.role}</h3>
          </div>
          <div className='flex my-6 justify-between items-center'>
               <button disabled type="button" className='text-xl bg-red-400 px-3 rounded-lg py-1'>Change Password</button>
          </div>
      </div>
    </div>
  )
}

export default Profile