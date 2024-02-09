import React, { useEffect, useState } from 'react'
import { useApp } from '../../../../hooks/useApp'
import { useUsers } from '../../Hooks'
import api from '../../../../helpers/axiosInstance'
import { toast } from 'react-toastify'
import usersUrl from '../../../../urls/user'

const EditOwner = ({handleClose}) => {
     const { setShowLoader  } = useApp()
     const { currentUser, refreshUsers, currentId } = useUsers()

     const [formData, setFormData] = useState({
      username: '',
      name: '',
      email: '',
      phone: '',
      role: '',
    });

     useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      setFormData({
        username: currentUser?.username,
        name: currentUser?.user?.name,
        email: currentUser?.user?.email,
        phone: currentUser?.user?.phone,
        role: currentUser?.user?.role,
        
      });
    }
  }, [currentUser]);
   

  if (!currentUser || currentUser.length === 0) {
    return (
         <div></div>
    );
  }   
   
     const handleInputChange = (e) => {
       const { name, value } = e.target;
       setFormData((prevData) => ({
         ...prevData,
         [name]: value,
       }));
     };
   
     const handleEditUser = async (e) => {
        
      e.preventDefault()
      
      if (!formData.username ||!formData.name || !formData.email || !formData.phone) {
        toast.error('Check required fields.');
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
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(formData.email)) {
        toast.error('Invalid Email');
        return;
      }
  
      try {
        setShowLoader(true);
        console.log(formData)
        
        const response = await api.put(usersUrl.edit_user.url, formData,{
          headers: {
            'Content-Type': 'application/json',
          },
          params:{id:currentId}

        });
        console.log(response);
        if (response.status === 201) {
          refreshUsers();
          handleClose();
          setFormData({
            username: '',
            name: '',
            email: '',
            phone: '',
            role: '',
          })
        toast.success('User Updated successfully!');
  
        } else {
          console.error('Failed to add patient');
        }
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.error);
      } finally {
        setShowLoader(false);
      }
      
    };
   
     return (
      <div className='bg-white w-[70%] mx-auto p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Edit User</h3>
      <form onSubmit={ handleEditUser }>
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
        <div className='flex justify-between items-center my-3'>
          <button onClick={handleClose} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Edit User</button>
        </div>
      </form>
    </div>
     );
}

export default EditOwner