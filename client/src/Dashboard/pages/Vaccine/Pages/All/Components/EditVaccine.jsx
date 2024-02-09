import React, { useEffect, useState } from 'react'
import { useApp } from '../../../../../hooks/useApp'
import { useVaccine } from '../../../Hooks'
import patientUrl from '../../../../../urls/patients'
import api from '../../../../../helpers/axiosInstance'
import { GiCancel } from 'react-icons/gi'
import { toast } from 'react-toastify'
import Loader from '../../../../../components/Loader'
import LocationData from '../../../../../urls/data/LocationData'
import customersUrl from '../../../../../urls/customers'
import boardingUrl from '../../../../../urls/boarding'
import moment from "moment-timezone";
import {DateTime} from 'luxon'
import treatmentUrl from '../../../../../urls/treatment'
import vaccineUrl from '../../../../../urls/vaccine'

const EditVaccine = ({handleClose}) => {
     const { setShowLoader  } = useApp()
     const { currentVaccine, setCurrentId, setCurrentVaccine, refreshVaccines, refreshInfo, currentId, patients, users } = useVaccine()
     const [formData, setFormData] = useState({
        name:'', 
        patient:'', 
        notes:'', 
        total_doses:'',
        amount:'', 
        description:''
    });

    useEffect(()=>{
      refreshInfo()
    },[])

   

     useEffect(() => {
    if (currentVaccine && Object.keys(currentVaccine).length > 0) {

      
      setFormData({
        patient: currentVaccine?.module_id?.patient?._id || '---',
        name: currentVaccine?.module_id?.name || '---',
        total_doses: currentVaccine?.module_id?.total_doses || '---',
        notes: currentVaccine?.module_id?.notes || '---',
        pay_id: currentVaccine?._id || '---',
        amount: currentVaccine?.amount || '---',
        description: currentVaccine?.description || '---',
      });
    }
  }, [currentVaccine]);

 
      

  if (!currentVaccine || Object.keys(currentVaccine).length === 0) {
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
   
     const handleEditVaccine = async (e) => {
        
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
        console.log(formData)
        
        const response = await api.put(vaccineUrl.edit_vaccine.url, formData,{
          headers: {
            'Content-Type': 'application/json',
          },
          params:{
            id:currentId
          }

        });
  
        if (response.status === 201) {
          refreshVaccines();
          handleClose();
          setCurrentVaccine([])
          setCurrentId(0)
          setFormData({
            name:'', 
            patient:'', 
            notes:'', 
            total_doses:'',
            amount:'', 
            description:''
          })
        toast.success(response.data.message);
  
        } else {
          console.error('Failed to update Vaccine');
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
     
      <form onSubmit={ handleEditVaccine }>
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
          <label htmlFor="start_date">Vaccine Number</label>
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
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Edit Vaccine</button>
        </div>
      </form>
    </div>
     );
}

export default EditVaccine