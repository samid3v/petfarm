import React, { useEffect, useState } from 'react';
import { useApp } from '../../../../../hooks/useApp';
import api from '../../../../../helpers/axiosInstance';
import { toast } from 'react-toastify';
import { useVaccine } from '../../../Hooks';
import vaccineUrl from '../../../../../urls/vaccine';
import moment from "moment-timezone";


const EditDose = ({handleClose, id, refreshData}) => {

  const { setShowLoader,setModalOpen } = useApp();
  const { users, refreshInfo } = useVaccine()
  const [showAdministered, setShowAdministered] = useState(false)
  const [dose, setDose] = useState([])
  const [doseId, setDoseId] = useState(0)



  const [formData, setFormData] = useState({
    id:'', 
    vaccine:'', 
    vet:'', 
    date:'', 
    administered:false,
  });

  useEffect(()=>{
    refreshInfo()
    setDoseId(id)
    
  },[])


  useEffect(()=>{
     if (doseId!==0) {
          getDoseFn()
     }
   },[doseId])

  const getDoseFn = async () => {
     try {
          setShowLoader(true)
         const response = await api.get(vaccineUrl.single_dose.url, {
          params: { id: id },
         });
   
         if (response.status === 200) {
           console.log('dose s info',response.data)
           setDose(response.data);
         } else {
           toast.error('Failed to fetch Dose Infp');
         }
      
     } catch (error) {
       toast.error(error.message);
     }finally{
          setShowLoader(false)
     }
   };

  useEffect(()=>{
    const today = getCurrentDate()
    if (formData.date) {
      if (today>=formData.date) {
        setShowAdministered(true)
      }else{
        setShowAdministered(false)
        formData.administered= false

      }
    }
  },[formData.date, dose])

  useEffect(()=>{
     setFormData({
          id:doseId,
          vaccine:dose?.vaccine, 
          vet:dose?.vet, 
          date: moment(dose?.date).format('YYYY-MM-DD'), 
          administered:dose?.administered,
     })
   },[dose])

  
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
  

  const EditDoseFn = async (e) => {
        
    e.preventDefault()

    if (!formData.date || !formData.vaccine || !formData.vet) {
      toast.error('Check required fields.');
      return;
    }
    
    
    console.log(formData)
    try {
      setShowLoader(true);
      
      const response = await api.put(vaccineUrl.edit_dose.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response)

      if (response.status === 201) {
        handleClose()
        refreshData();
        setFormData({
          id:'',
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

  const closeModalFn = () =>{
     handleClose()
     setDoseId(0)
     setDose([])
  }
  return (
    <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Edit Dose</h3>
      <form onSubmit={ EditDoseFn }>
        <div className='flex justify-start gap-5 items-center my-4 '>
          
          <div className="w-full">
            <label htmlFor="date">Vaccine Date</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                
                type="date"
                name="date"
                id="date"
                value={formData.date}
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

          {showAdministered && (
            <div className="w-full">
            <label htmlFor='administered' className="flex mt-5 ">
              <input
                type="checkbox"
                name="administered"
                id="administered"
                checked={formData.administered}
                onChange={handleInputChange}
                className="text-blue-500 focus:ring-0 focus:outline-none"
              />
              <span className="ml-2">Administered</span>
            </label>
          </div>
          )}
          
          
        </div>
        
        <div className='flex justify-between items-center my-3'>
          <button type='button' onClick={closeModalFn} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Edit Dose</button>
        </div>
      </form>
    </div>
  );
};

export default EditDose;
