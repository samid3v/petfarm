import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';
import { useApp } from '../../../../hooks/useApp';
import { usePatients } from '../../Hooks/usePatients';
import { toast } from 'react-toastify';
import api from '../../../../helpers/axiosInstance';
import patientUrl from '../../../../urls/patients';

const AddPatient = ({handleClose}) => {

  const { setShowLoader,setModalOpen } = useApp();
  const { getAllPatients, getAllCustomers, customers } = usePatients()

  useEffect(()=>{

    getAllCustomers()

 },[])

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    gender: '',
    age: '',
    a_unit: '',
    species: '',
    weight: '',
    w_unit: '',
    owner: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPatient = async (e) => {

    e.preventDefault()
    console.log(formData)
    
    if (!formData.name || !formData.owner || !formData.gender || !formData.age || !formData.weight) {
      toast.error('Check required fields.');
      return;
    }

    if (formData.age) {
      if (!formData.a_unit) {
        toast.error('Select age units');
        return;
      }
    }
    if (formData.a_unit) {
      if (!formData.age) {
        toast.error('Age is required');
        return;
      }
    }
    if (formData.weight) {
      if (!formData.w_unit) {
        toast.error('Select weight units');
        return;
      }
    }
    if (formData.w_unit) {
      if (!formData.weight) {
        toast.error('Weight is required');
        return;
      }
    }

    try {
      setShowLoader(true);
      
      const response = await api.post(patientUrl.add_patient.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        getAllPatients();
        handleClose();
        setFormData({
          name: '',
          gender: '',
          breed: '',
          age: '',
          a_unit: '',
          species: '',
          weight: '',
          w_unit: '',
          owner: '',
        })
      toast.success('Patient added successfully!');

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
    <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Patient</h3>
      <form onSubmit={ handleAddPatient }>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 my-2 '>
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
            <label htmlFor="gender">Patient Gender</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                type="text"
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                  <option value=" ">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  
              </select>
          </div>
          <div className="w-full">
            <label htmlFor="species">Breed</label>
              <input
                className='w-full rounded-lg border py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='breed...'
                type="text"
                name="breed"
                id="breed"
                value={formData.breed}
                onChange={handleInputChange}
              />
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="name">Age</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='age...'
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Age Units</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                type="text"
                name="a_unit"
                id="a_unit"
                value={formData.a_unit}
                onChange={handleInputChange}
              >
                  <option value=" ">Select Age Unit</option>
                  <option value="year">Years</option>
                  <option value="month">Months</option>
                  
              </select>
          </div>
          <div className="w-full">
            <label htmlFor="species">Species</label>
              <input
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='species...'
                type="text"
                name="species"
                id="species"
                value={formData.species}
                onChange={handleInputChange}
              />
          </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="name">Weight</label>
              <input
                className='w-full rounded-lg border-[1px] py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='weight...'
                type="number"
                name="weight"
                id="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="species">Weight Units</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                type="text"
                name="w_unit"
                id="w_unit"
                value={formData.w_unit}
                onChange={handleInputChange}
              >
                  <option value=" ">Select Weight Unit</option>
                  <option value="kg">Kgs</option>
                  <option value="gram">Grams</option>
                  
              </select>
          </div>
          <div className="w-full">
            <label htmlFor="species">Owner</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='owner...'
                type="text"
                name="owner"
                id="owner"
                value={formData.owner}
                onChange={handleInputChange}
              >
                  <option value="select">Select Owner</option>
                  {
                    customers.map((customer, index)=>(
                      <option key={index} value={`${customer._id}`}>{customer.name}</option>

                    ))
                  }
              </select>
          </div>
        </div>
        <div className='flex justify-between items-center my-3'>
          <button onClick={handleClose} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Add Patient</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
