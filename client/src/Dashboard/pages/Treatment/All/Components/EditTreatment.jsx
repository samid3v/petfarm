import React, { useEffect, useState } from 'react'
import { useApp } from '../../../../hooks/useApp'
import { useTreatment } from '../../Hooks'
import patientUrl from '../../../../urls/patients'
import api from '../../../../helpers/axiosInstance'
import { GiCancel } from 'react-icons/gi'
import { toast } from 'react-toastify'
import Loader from '../../../../components/Loader'
import LocationData from '../../../../urls/data/LocationData'
import customersUrl from '../../../../urls/customers'
import boardingUrl from '../../../../urls/boarding'
import moment from "moment-timezone";
import {DateTime} from 'luxon'
import treatmentUrl from '../../../../urls/treatment'

const EditTreatment = ({handleClose}) => {
     const { setShowLoader  } = useApp()
     const { currentTreatment, setCurrentId, setCurrentTreatment, refreshTreatments, refreshInfo, currentId, patients, users } = useTreatment()
     const [formData, setFormData] = useState({
      name:'', 
      patient:'', 
      vet:'', 
      notes:'', 
      date:'', 
      amount:'',
      pay_id: '',
      description:''
    });
    const [maxDate, setMaxDate] = useState('')


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

     useEffect(() => {
    if (currentTreatment && Object.keys(currentTreatment).length > 0) {

      
      setFormData({
        name: currentTreatment?.module_id?.name ,
        patient: currentTreatment?.module_id?.patient?._id ,
        vet: currentTreatment?.module_id?.vet?._id ,
        date: moment(currentTreatment?.module_id?.date).format('YYYY-MM-DD'),
        notes: currentTreatment?.module_id?.notes ,
        pay_id: currentTreatment?._id ,
        amount: currentTreatment?.amount ,
        description: currentTreatment?.description,
      });
    }
  }, [currentTreatment]);

 
      

  if (!currentTreatment || Object.keys(currentTreatment).length === 0) {
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
   
     const handleEditTreatment = async (e) => {
        
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
        console.log(formData)
        
        const response = await api.put(treatmentUrl.edit_treatment.url, formData,{
          headers: {
            'Content-Type': 'application/json',
          },
          params:{
            id:currentId
          }

        });
  
        if (response.status === 201) {
          refreshTreatments();
          handleClose();
          setCurrentTreatment([])
          setCurrentId(0)
          setFormData({
            name:'', 
            patient:'', 
            vet:'', 
            notes:'', 
            date:'', 
            amount:'',
            pay_id: '',
            description:''
          })
        toast.success('Treatment Updated successfully!');
  
        } else {
          console.error('Failed to update Treatment');
        }
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setShowLoader(false);
      }
      
    };
   
     return (
      <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Edit Treatment</h3>
     
      <form onSubmit={ handleEditTreatment }>
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
                  <option value="">Select Vet </option>
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
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Edit Treatment</button>
        </div>
      </form>
    </div>
     );
}

export default EditTreatment