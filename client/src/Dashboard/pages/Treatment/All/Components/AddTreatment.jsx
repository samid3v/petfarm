import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';
import { useApp } from '../../../../hooks/useApp';
import { useTreatment } from '../../Hooks';
import { toast } from 'react-toastify';
import api from '../../../../helpers/axiosInstance';
import boardingUrl from '../../../../urls/boarding';
import random from '../../../../urls/random';
import treatmentUrl from '../../../../urls/treatment';

const AddTreatment = ({handleClose}) => {


  const { setShowLoader,setModalOpen } = useApp();
  const [maxDate, setMaxDate] = useState('')
  const { refreshTreatments } = useTreatment()
  const [formData, setFormData] = useState({
    name:'', 
    patient:'', 
    vet:'', 
    notes:'', 
    date:'', 
    amount:'', 
    description:''
  });
  const { patients, users, refreshInfo } = useTreatment()


 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    refreshInfo()
    getFormattedToday()
  },[])

  const getFormattedToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    setMaxDate(`${year}-${month}-${day}`);
  };
  
  const handleAddTreatment = async (e) => {
        
    e.preventDefault()
    
    if (!formData.name || !formData.patient || !formData.amount || !formData.date) {
      toast.error('Check required fields.');
      return;
    }

    if (formData.patient === '') {
      toast.error('Select Patient Name fields.');
      return;
    }

   
    try {
      setShowLoader(true);
      
      const response = await api.post(treatmentUrl.add_treatment.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        refreshTreatments();
        handleClose();
        setFormData({
          name:'', 
          patient:'', 
          vet:'', 
          notes:'', 
          date:'', 
          amount:'', 
          description:''
        })
      toast.success('Treatment Record added successfully!');

      } else {
        console.error('Failed to add Treatment Record');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setShowLoader(false);
    }
  
    
  };

  return (
    <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Treatment</h3>
      <form onSubmit={ handleAddTreatment }>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="start_date">Treatment Name</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='Treatment Name...'
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Vet Name</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                name="vet"
                id="vet"
                value={formData.vet}
                onChange={handleInputChange}
              >
                  <option value=" ">Select Vet </option>
                  { users && (users.map((user, index)=>(
                      <option key={index} value={user._id}>{user?.name }</option>

                    )))
                  }
              </select>
          </div>
          
          <div className="w-full">
            <label htmlFor="patient">Patient Name</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                
                name="patient"
                id="patient"
                value={formData.patient}
                onChange={handleInputChange}
              >
                  <option value="">Select Patient </option>
                  { patients && (patients.map((patient, index)=>(
                      <option key={index} value={patient?._id}>{patient?.name}</option>

                    )))
                  }
              </select>
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="amount">Amount</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='Amount...'
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="date">Treatment Date</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                type="date"
                name="date"
                id="date"
                max={maxDate}
                value={formData.date}
                onChange={handleInputChange}
              />
          </div>
          
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 my-2 '>
          
          <div className="w-full">
            <label htmlFor="species">Boarding Notes</label>
              <textarea
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='Boarding Notes...'
                type="text"
                name="notes"
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={handleInputChange}
              >
                  
              </textarea>
          </div>
          <div className="w-full">
            <label htmlFor="species">Amount Description</label>
              <textarea
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='Amount Description...'
                type="text"
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
              >
                  
              </textarea>
          </div>
          
        </div>
        <div className='flex justify-between items-center my-3'>
          <button type='button' onClick={handleClose} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Add Treatment</button>
        </div>
      </form>
    </div>
  );
};

export default AddTreatment;
