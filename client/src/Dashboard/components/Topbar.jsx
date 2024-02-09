import React, { useState } from 'react'
import { useApp } from '../hooks/useApp'
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import api from '../helpers/axiosInstance';
import loginUrls from '../urls/login';
import { toast } from 'react-toastify';
import { clearLocalStorage } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate()

  const {user,setShowLoader, showMobileSidebar, setShowMobileSidebar} = useApp()
  const [toggleUser, setToggleUser] = useState(false)

  const logOutFn = async() =>{
    try {

      setShowLoader(true);

           const response = await api.post(loginUrls.logout.url, [],{
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              console.log(response);
              if (response.status===200) {

                clearLocalStorage('user')
                // clearLocalStorage('token')
                toast.success('Logged out successfully');
                
                navigate('/')
              console.log(response);

                
              }
           
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          // Handle cases where the response or its properties are undefined
          toast.error('An error occurred while logging out.');
          console.log(error);
        }
           
      }finally{
           setShowLoader(false);

      }
  }

  return (
    <div className='py-2 relative bg-white px-2  rounded-l-lg rounded-r-lg'>
      <div className='flex justify-between items-center'>
        <div className='flex justify-start gap-3 items-center'>
          <FiMenu className='text-xl md:hidden cursor-pointer' onClick={()=>setShowMobileSidebar(true)} />
          <h3>PetFarm</h3>
        </div>
        <div className='flex justify-start gap-4 items-center'>
          <h3>Welcome {user?.user?.name}</h3>
          <FaAngleDown onClick={()=>setToggleUser(!toggleUser)} />
        </div>
      </div>
      {toggleUser && <div className='bg-white absolute p-1 right-0 rounded-lg shadow-md transition-all ease-in-out delay-200'>
        <ul className='my-2'>
          <li onClick={()=>navigate('./profile')} className='hover:bg-slate-200 cursor-pointer px-2 py-1 rounded-lg'>Profile</li>
          <li onClick={logOutFn} className='hover:bg-slate-200 cursor-pointer px-2 py-1 rounded-lg'>Log Out</li>
        </ul>
      </div>}
    </div>
  )
}

export default Topbar