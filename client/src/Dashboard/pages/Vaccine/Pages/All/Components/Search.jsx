import React, { useEffect, useState } from 'react';
import { useApp } from '../../../../../hooks/useApp';
import { toast } from 'react-toastify';
import api from '../../../../../helpers/axiosInstance';
import { useVaccine } from '../../../Hooks';
import vaccineUrl from '../../../../../urls/vaccine';

const Search = () => {
  const { setShowLoader, setShowFilterModal } = useApp();
  const { setVaccines, refreshInfo, patients } = useVaccine();
  const [formData, setFormData] = useState({
    status: '',
    patient: '',
    name: '',
  });


  useEffect(()=>{
    refreshInfo()
  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

     if (formData.date!=='' && formData.end_date!=='') {
          if (formData.date>formData.end_date) {
      toast.error('incorrect search dates');
               return
          }
     }

    console.log(formData)

    try {
      setShowLoader(true);

      const response = await api.post(vaccineUrl.search_vaccine.url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setFormData({
          status: '',
          patient: '',
          name: '',
        });
        console.log(response.data);
     setVaccines(response.data)
     setShowFilterModal(false)
      } else {
        console.error('Failed to search Vaccine Records');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="bg-white p-3 overflow-x-hidden rounded-md shadow-xl">
      <h3 className="text-xl font-semibold">Filter Vaccines</h3>
      <form onSubmit={handleSearch}>
        <div className="flex flex-col gap-2 my-2 md:flex-row md:items-center">
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
            <label htmlFor="species">Select Status</label>
              <select
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                name="vet"
                id="vet"
                value={formData.status}
                onChange={handleInputChange}
              >
                  <option value="">Select Status </option>
                  <option value="Pending">Pending </option>
                  <option value="In Progress">In Progress </option>
                  <option value="Completed">Completed </option>
                  <option value="Canceled">Canceled </option>
                  
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
        <div className="flex justify-between items-center my-3">
          <button
            type="button"
            onClick={() => setShowFilterModal(false)}
            className="bg-gray-300 w-[80px] py-2 px-3 rounded-lg"
          >
            Close
          </button>
          <button type="submit" className="bg-primary py-2 px-3 rounded-lg">
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
