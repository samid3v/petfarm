import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from '../helpers/axiosInstance';
import loginUrls from '../urls/login';
import { useApp } from '../hooks/useApp';
import { encryptData } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Login = () => {

     const navigate = useNavigate()
     
     const [formData, setFormData] = useState({
          username:'',
          password:'',
     })

     const { setShowLoader,setToken, setUser } = useApp();


     const handleInputChange = async (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        };

        const logInFn = async (e) => {
               e.preventDefault()
               if (formData.username === '' || formData.password === '' ) {
                    toast.error('Check required fields')
                    return
               }
               try {

               setShowLoader(true);

                    const response = await api.post(loginUrls.login.url, formData,{
                         headers: {
                           'Content-Type': 'application/json',
                         },
                       });
     
                       
                       if (response.status===200) {
                         console.log(response.data)
                         // await new Promise((resolve) => setTimeout(resolve, 1000));

                         setUser(response.data.user)
                         // setToken(response.data.doc.token)
                         encryptData(response.data.user, 'user')
                         // encryptData(response.data.doc.token, 'token')
                         
                         setFormData({
                              username:'',
                              password:'',
                         })
                         toast.success(response.data.message)
                         navigate('/dashboard')
                         
                       }
                    
               } catch (error) {
                    console.log(error);
                    // toast.error(error.response.data.error);
                    
               }finally{
                    setShowLoader(false);

               }

               
        }
  return (
     <div className='flex justify-center items-center h-screen'>
          <div className='w-[30%] bg-white p-4 rounded-lg shadow-2xl'>
               <h3 className='text-center text-lg font-semibold'>PETFARM Login</h3>
          <div className='my-3'>
               <p>username: admin</p>
               <p>password: admin123</p>
          </div>
               <form onSubmit={logInFn} className='flex flex-col gap-3'>
                    <div className="w-full">
                         <label htmlFor="payment_date">Username</label>
                         <input
                              className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                              placeholder='Username...'
                              type="text"
                              name="username"
                              id="username"
                              value={formData.username}
                              onChange={handleInputChange}
                         />
                    </div>
                    <div className="w-full">
                         <label htmlFor="payment_date">Password</label>
                         <input
                              className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                              placeholder='Password...'
                              type="password"
                              name="password"
                              id="password"
                              value={formData.password}
                              onChange={handleInputChange}
                         />
                    </div>
                    <button type='submit' className='bg-primary w-full py-2 px-3 rounded-lg'>Login</button>
               </form>
          </div>
     </div>
  )
}

export default Login