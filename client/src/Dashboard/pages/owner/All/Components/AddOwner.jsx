import React, { useEffect, useState } from 'react';
import Modal from '../../../../components/Modal';
import { useApp } from '../../../../hooks/useApp';
import { useOwners } from '../../Hooks';
import { toast } from 'react-toastify';
import api from '../../../../helpers/axiosInstance';
import LocationData from '../../../../urls/data/LocationData';
import customersUrl from '../../../../urls/customers';

const AddOwner = ({handleClose}) => {

  const { setShowLoader,setModalOpen } = useApp();
  const { refreshOwners, getAllCustomers, customers } = useOwners()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    county: '',
    sub_county: '',
    ward: '',
    street:''
  });
  const [subCounty, setSubCounty] = useState([])
  const [wards, setWards] = useState([])

 
 useEffect(()=>{
  if (formData.sub_county!=='select') {
    
    const selectedSubCountyData = subCounty.find((county) => county.constituency_name ===formData.sub_county );
    setWards(selectedSubCountyData?.wards || []);
    // setSubCounty(null);
    // setSubCounty(LocationData.filter((data)=>data.counties.county_name.includes(formData.county)))
    console.log(wards)
  }else{

    setWards([])
  }

},[formData.sub_county])

useEffect(()=>{

  if (formData.county!=='select') {
    
    const selectedCountyData = LocationData.counties.find((county) => county.county_name ===formData.county );
    setSubCounty([]);
    
    setSubCounty(selectedCountyData?.constituencies || []);
    
  }else{

    setSubCounty([])
  }

  setWards([])

},[formData.county])



  

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
      
      const response = await api.post(customersUrl.add_customer.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        refreshOwners();
        handleClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          county: '',
          sub_county: '',
          ward: '',
          street:''
        })
      toast.success('Customers added successfully!');

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
      <h3 className='text-xl font-semibold'>Add Owner</h3>
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
        <div className='flex flex-col sm:flex-row justify-between items-center gap-2 my-2 '>
          
          <div className="w-full">
            <label htmlFor="species">County</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='county...'
                type="text"
                name="county"
                id="county"
                value={formData.county}
                onChange={handleInputChange}
              >
                  <option value="select">Select County</option>
                  {
                    LocationData.counties.map((location, index)=>(
                      <option key={index} value={`${location.county_name}`}>{location.county_name}</option>

                    ))
                  }
              </select>
          </div>
          <div className="w-full">
            <label htmlFor="species">Sub-County</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='county...'
                type="text"
                name="sub_county"
                id="sub_county"
                value={formData.subcounty}
                onChange={handleInputChange}
              >
                  <option value="select">Select Sub-County</option>
                  { subCounty && (subCounty.map((subc, index)=>(
                      <option key={index} value={`${subc.constituency_name}`}>{subc.constituency_name}</option>

                    )))
                  }
              </select>
          </div>
          <div className="w-full">
            <label htmlFor="species">Ward</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='wards...'
                type="text"
                name="ward"
                id="ward"
                value={formData.ward}
                onChange={handleInputChange}
              >
                  <option value="select">Select Ward</option>
                  {
                    wards.map((ward, index)=>(
                      <option key={index} value={`${ward}`}>{ward}</option>

                    ))
                  }
              </select>
          </div>
        </div>
        <div className='flex justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="street">Street Address</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='street...'
                type="text"
                name="street"
                id="street"
                value={formData.street}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
            <label htmlFor="name">Phone (254...)</label>
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
          
        </div>
        <div className='flex justify-between items-center my-3'>
          <button onClick={handleClose} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Add Owner</button>
        </div>
      </form>
    </div>
  );
};

export default AddOwner;
