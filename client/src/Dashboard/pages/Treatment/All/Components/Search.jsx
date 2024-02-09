import React, { useEffect, useState } from 'react';
import { useApp } from '../../../../hooks/useApp';
import { toast } from 'react-toastify';
import api from '../../../../helpers/axiosInstance';
import treatmentUrl from '../../../../urls/treatment';
import { useTreatment } from '../../Hooks';

const Search = () => {
  const { setShowLoader, setShowFilterModal } = useApp();
  const { setTreatments, refreshInfo, users,patients } = useTreatment();
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    patient: '',
    vet: '',
    name: '',
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

      const response = await api.post(treatmentUrl.search_treatment.url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setFormData({
          start_date: '',
          end_date: '',
          patient: '',
          vet: '',
          name: '',
        });
        console.log(response.data);
     setTreatments(response.data)
     setShowFilterModal(false)
      } else {
        console.error('Failed to searchind Boarding Record');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div className="bg-white p-3 overflow-x-hidden rounded-md shadow-xl">
      <h3 className="text-xl font-semibold">Search Boarding</h3>
      <form onSubmit={handleSearch}>
        <div className="flex flex-col gap-2 my-2 md:flex-row md:items-center">
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
          <div className="w-full md:w-1/2">
            <label htmlFor="start_date">From</label>
            <input
              className="w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] "
              placeholder="start date..."
              type="date"
              name="start_date"
              id="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="date">To</label>
            <input
              className="w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] "
              type="date"
              name="end_date"
              id="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 my-2 md:flex-row md:items-center">
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
                      <option key={index} value={user._id}>{user?.name || '---'}</option>

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
