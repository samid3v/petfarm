import React, { useEffect, useState } from 'react';
import Modal from '../../../../../components/Modal';
import { useApp } from '../../../../../hooks/useApp';
import { useVaccine } from '../../../Hooks';
import { toast } from 'react-toastify';
import api from '../../../../../helpers/axiosInstance';
import boardingUrl from '../../../../../urls/boarding';
import random from '../../../../../urls/random';
import treatmentUrl from '../../../../../urls/treatment';
import vaccineUrl from '../../../../../urls/vaccine';

const AddVaccine = ({handleClose}) => {


  const { setShowLoader,setModalOpen } = useApp();
  const [maxDate, setMaxDate] = useState('')
  const { refreshVaccines } = useVaccine()
  const [formData, setFormData] = useState({
    name:'', 
    patient:'', 
    notes:'', 
    total_doses:'',
    amount:'', 
    description:''
  });
  const { patients, users, refreshInfo } = useVaccine()


 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(()=>{
    refreshInfo()
  },[])

  
  
  const addVaccineFn = async (e) => {
        
    e.preventDefault()
    
    if (!formData.name || !formData.patient || !formData.amount || !formData.total_doses) {
      toast.error('Check required fields.');
      return;
    }

    if (formData.patient === '') {
      toast.error('Select Patient Name fields.');
      return;
    }

   
    try {
      setShowLoader(true);
      
      const response = await api.post(vaccineUrl.add_vaccine.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        refreshVaccines();
        handleClose();
        setFormData({
          name:'', 
          patient:'', 
          notes:'', 
          total_doses:'',
          amount:'', 
          description:''
        })
      toast.success('Vaccine Record added successfully!');

      } else {
        console.error('Failed to add Vaccine Record');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setShowLoader(false);
    }
  
    console.log(formData)
    
  };

  return (
    <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Vaccine</h3>
      <form onSubmit={ addVaccineFn }>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="start_date">Vaccine Name</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='Vaccine Name...'
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
          <label htmlFor="start_date">No of Vaccines</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='Number of Vaccines...'
                type="number"
                name="total_doses"
                id="total_doses"
                value={formData.total_doses}
                onChange={handleInputChange}
              />
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
            <label htmlFor="species">Vaccine Notes</label>
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
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Add Vaccine</button>
        </div>
      </form>
    </div>
  );
};

export default AddVaccine;
