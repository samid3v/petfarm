import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';
import { useApp } from '../../../../hooks/useApp';
import { useBoarding } from '../../Hooks';
import { toast } from 'react-toastify';
import api from '../../../../helpers/axiosInstance';
import boardingUrl from '../../../../urls/boarding';

const AddBoarder = ({handleClose}) => {

  const { setShowLoader,setModalOpen } = useApp();
  const { patients, refreshBoarders, refreshStats } = useBoarding()
  const [formData, setFormData] = useState({
    patient_id:'', 
    start_date:'', 
    end_date:'', 
    notes:'', 
    status:'', 
    amount:'', 
    description:''
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBoarder = async (e) => {
        
    e.preventDefault()
    
    if (!formData.start_date || !formData.end_date || !formData.amount) {
      toast.error('Check required fields.');
      return;
    }

    if (formData.patient_id === 'select') {
      toast.error('Select Patient Name fields.');
      return;
    }

  
    try {
      setShowLoader(true);
      
      const response = await api.post(boardingUrl.add_boarding.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        refreshBoarders();
        refreshStats();
        handleClose();
        setFormData({
          patient_id:'', 
          start_date:'', 
          end_date:'', 
          notes:'', 
          status:'', 
          amount:'', 
          description:''
        })
      toast.success('Boarding Record added successfully!');

      } else {
        console.error('Failed to add Boarding Record');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setShowLoader(false);
    }
    
  };

  return (
    <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Boarding</h3>
      <form onSubmit={ handleAddBoarder }>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="start_date">Start Date</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='start date...'
                type="datetime-local"
                name="start_date"
                id="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="end_date">End Date</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='end date...'
                type="datetime-local"
                name="end_date"
                id="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Patient Name</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='county...'
                name="patient_id"
                id="patient_id"
                value={formData.patient_id}
                onChange={handleInputChange}
              >
                  <option value="select">Select Patient </option>
                  { patients && (patients.map((patient, index)=>(
                      <option key={index} value={patient._id}>{patient.name}</option>

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
      <label htmlFor="status">Status</label>
      <div className="flex space-x-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="status"
            id="completed"
            value="Completed"
            checked={formData.status === 'Completed'}
            onChange={handleInputChange}
            className="form-radio text-blue-500 focus:ring-0 focus:outline-none"
          />
          <span className="ml-2">Completed</span>
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            name="status"
            id="in_progress"
            value="In Progress"
            checked={formData.status === 'In Progress'}
            onChange={handleInputChange}
            className="form-radio text-red-500 focus:ring-0 focus:outline-none"
          />
          <span className="ml-2">In Progress</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="status"
            id="booked"
            value="Booked"
            checked={formData.status === 'Booked'}
            onChange={handleInputChange}
            className="form-radio text-red-500 focus:ring-0 focus:outline-none"
          />
          <span className="ml-2">Booked</span>
        </label>
      </div>
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
            <label htmlFor="species">Payment Notes</label>
              <textarea
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='Payment Notes...'
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
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Add Boarding</button>
        </div>
      </form>
    </div>
  );
};

export default AddBoarder;
