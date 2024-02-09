import React, { useEffect, useState } from 'react';
import { useApp } from '../../../../../hooks/useApp';
import api from '../../../../../helpers/axiosInstance';
import { toast } from 'react-toastify';
import { useVaccine } from '../../../Hooks';
import vaccineUrl from '../../../../../urls/vaccine';

const AddDose = ({handleClose, id, refreshData}) => {

  const { setShowLoader,setModalOpen } = useApp();
  const { users, refreshInfo } = useVaccine()
  const [showAdministered, setShowAdministered] = useState(true)

  const [formData, setFormData] = useState({
    vaccine:'', 
    vet:'', 
    date:'', 
    administered:false,
  });

  useEffect(()=>{
    refreshInfo()
  },[])

  useEffect(()=>{
    const today = getCurrentDate()
    if (formData.date) {
      if (today>formData.date) {
        setShowAdministered(false)
      }else{
        setShowAdministered(true)

      }
    }
  },[formData.date])

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const addDoseFn = async (e) => {
        
    e.preventDefault()

    formData.vaccine = id
    

    if (!formData.date || !formData.vaccine || !formData.vet) {
      toast.error('Check required fields.');
      return;
    }
    
    
    console.log(formData)
    try {
      setShowLoader(true);
      
      const response = await api.post(vaccineUrl.add_dose.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        handleClose()
        refreshData();
        setFormData({
          vaccine:'', 
          vet:'', 
          date:'', 
          administered:false,
        })
      toast.success('Dose Record added successfully!');

      } else {
        console.error('Failed to add Dose Record');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setShowLoader(false);
    }
    
  };

  return (
    <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Dose</h3>
      <form onSubmit={ addDoseFn }>
        <div className='flex flex-col md:flex-row justify-start gap-5 items-center my-4 '>
          
          <div className="w-full">
            <label htmlFor="date">Vaccine Date</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='payment date...'
                type="date"
                name="date"
                id="date"
                value={formData.payment_date}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="vet">Vet Name</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                name="vet"
                id="vet"
                value={formData.vet}
                onChange={handleInputChange}
              >
                  <option value="">Select Vet </option>
                  { users && (users.map((user, index)=>(
                      <option key={index} value={user._id}>{user?.name || '---'}</option>

                    )))
                  }
              </select>
          </div>

          
            <div className="w-full">
            <label htmlFor='administered' className="flex mt-5 ">
              <input
                type="checkbox"
                name="administered"
                id="administered"
                disabled={showAdministered}
                checked={formData.administered}
                onChange={handleInputChange}
                className="text-blue-500 focus:ring-0 focus:outline-none"
              />
              <span className="ml-2">Administered</span>
            </label>
          </div>
          
          
        </div>
        
        <div className='flex justify-between items-center my-3'>
          <button type='button' onClick={handleClose} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Add Dose</button>
        </div>
      </form>
    </div>
  );
};

export default AddDose;
