import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';
import { useApp } from '../../../../hooks/useApp';
import { useUsers } from '../../Hooks';
import { toast } from 'react-toastify';
import api from '../../../../helpers/axiosInstance';
import LocationData from '../../../../urls/data/LocationData';
import customersUrl from '../../../../urls/customers';
import usersUrl from '../../../../urls/user';

const AddUser = ({handleClose}) => {

  const { setShowLoader,setModalOpen } = useApp();
  const { refreshUsers, getAllCustomers, customers } = useUsers()
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    cpassword: '',
  });
 
  const [passError, setPassError] = useState(null)

  useEffect(() => {
    if (formData.password) {
      if (formData.cpassword!==formData.password) {
        setPassError('Password dont match');
      }else{
        setPassError(null)
      }
    }
  }, [formData.cpassword])
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPatient = async (e) => {
        
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Check required fields.');
      return;
    }

    if (formData.username.includes<' ') {
      toast.error('Spaces are not allowed in username');
      return;
    }

    if (formData.phone.length!==12) {
      toast.error('Invalid Phone Number length');
      return;
    }

    const cleanedPhoneNumber = formData.phone.replace(/\D/g, '');

  const regex = /^254/;

  const isPhoneOk = regex.test(cleanedPhoneNumber);

  if (!isPhoneOk) {
    toast.error('Invalid Phone Number format');
    return;
  }
  if (formData.cpassword!==formData.password) {
    toast.error('Password dont match');
    return;
  }

  if (formData.password.length<6) {
    toast.error('Password length is less than 6 characters');
    return;
  }
  

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid Email');
      return;
    }

    try {
      setShowLoader(true);
      
      const response = await api.post(usersUrl.register.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        refreshUsers();
        handleClose();
        setFormData({
          username: '',
          name: '',
          email: '',
          phone: '',
          role: '',
          password: '',
          cpassword: '',
        })
      toast.success('User added successfully!');

      } else {
        console.error('Failed to add patient');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setShowLoader(false);
    }
    
  };

  return (
    <div className='bg-white w-[70%] mx-auto p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add User</h3>
      <form onSubmit={ handleAddPatient }>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="name">Name</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='name...'
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="username">UserName</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='username...'
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Email</label>
              <input
                className='w-full rounded-lg border py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='email...'
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
          </div>
        </div>
        <div className='flex justify-between items-center gap-2 my-2 '>
         
          <div className="w-full">
            <label htmlFor="name">Phone</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='phone...'
                type="number"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Role</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='county...'
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                  <option value=" ">Select Role</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                  
              </select>
          </div>
          
        </div>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-2 my-2 '>
          
          <div className="w-full">
            <label htmlFor="street">Password</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='street...'
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="cpassword">Confirm Password</label>
              <input
                className={`w-full rounded-lg border py-2 px-2 overflow-x-hidden ${passError? 'border-red-700':'border-black'} outline-none focus:border-[1px] `}
                placeholder='street...'
                type="password"
                name="cpassword"
                id="cpassword"
                value={formData.cpassword}
                onChange={handleInputChange}
              />

          </div>
          
        </div>
        {passError && <p className='text-red-700 text-right text-sm py-1'>{passError}</p>}
        
        <div className='flex justify-between items-center my-3'>
          <button onClick={handleClose} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Add User</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
