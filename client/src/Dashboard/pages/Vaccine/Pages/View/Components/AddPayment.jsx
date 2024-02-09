import React, { useEffect, useState } from 'react';
import { useApp } from '../../../../../hooks/useApp';
import api from '../../../../../helpers/axiosInstance';
import boardingUrl from '../../../../../urls/boarding';
import { toast } from 'react-toastify';
import trasactionUrl from '../../../../../urls/transaction';

const AddPayment = ({handleClose, id, refreshData}) => {

  const { setShowLoader,setModalOpen } = useApp();


  const [formData, setFormData] = useState({
    payment_id:'', 
    mpesa_transaction_id:'', 
    amount_paid:'', 
    payment_type:'', 
    bank_transaction_reference:'',
    bank_name:'',
    payment_date:''
  });

  const [maxDate, setMaxDate] = useState('')

  useEffect(()=>{
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

  const handleAddPayment = async (e) => {
        
    e.preventDefault()

    formData.payment_id = id
    

    if (!formData.amount_paid || !formData.payment_date || !formData.payment_id) {
      toast.error('Check required fields.');
      return;
    }

    if (formData.payment_type === 'Mpesa') {
      if (!formData.mpesa_transaction_id) {
        formData.bank_name=""
        formData.bank_transaction_reference=""
        toast.error('Mpesa transaction number is required');
        return;        
      }
    }

    if (formData.payment_type === 'Cash') {
        formData.bank_name=""
        formData.mpesa_transaction_id=""
        formData.bank_transaction_reference=""
    }

    if (formData.payment_type === 'Bank') {
      if (!formData.bank_transaction_reference || !formData.bank_name) {
        formData.mpesa_transaction_id=""
        toast.error('Bank Details are required');
        return;        
      }
    }

    console.log(formData)
    try {
      setShowLoader(true);
      
      const response = await api.post(trasactionUrl.add_transaction.url, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        refreshData();
        setFormData({
          payment_id:'', 
          mpesa_transaction_id:'', 
          amount_paid:'', 
          payment_type:'', 
          bank_transaction_reference:'',
          bank_name:'',
          payment_date:''
        })
      toast.success('Transaction Record added successfully!');

      } else {
        console.error('Failed to add Transaction Record');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setShowLoader(false);
    }
    
  };

  return (
    <div className='bg-white w-full p-3 overflow-x-hidden rounded-md shadow-xl'>
      <h3 className='text-xl font-semibold'>Add Payment</h3>
      <form onSubmit={ handleAddPayment }>
        <div className='flex flex-col md:flex-row justify-between items-center gap-2 my-2 '>
          <div className="w-full">
            <label htmlFor="amount_paid">Payment Amount</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='Payment Amount...'
                type="number"
                name="amount_paid"
                id="amount_paid"
                value={formData.amount_paid}
                onChange={handleInputChange}
              />
          </div>
        </div>
        <div className='flex justify-between items-center gap-2 my-2 '>
          
        <div className="w-full">
            <label htmlFor="payment_date">Payment Date</label>
              <input
                className='w-full rounded-lg border py-2 px-2 overflow-x-hidden border-black outline-none focus:border-[1px] '
                placeholder='payment date...'
                type="date"
                max={maxDate}
                name="payment_date"
                id="payment_date"
                value={formData.payment_date}
                onChange={handleInputChange}
              />
          </div>
          <div className="w-full">
      <label htmlFor="status">Payment Type</label>
      <div className="flex space-x-4">
        <label className="flex justify-center items-center">
          <input
            type="radio"
            name="payment_type"
            id="mpesa"
            value="Mpesa"
            checked={formData.payment_type === 'Mpesa'}
            onChange={handleInputChange}
            className="form-radio text-blue-500 focus:ring-0 focus:outline-none"
          />
          <span className="ml-2">Mpesa</span>
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            name="payment_type"
            id="cash"
            value="Cash"
            checked={formData.payment_type === 'Cash'}
            onChange={handleInputChange}
            className="form-radio text-red-500 focus:ring-0 focus:outline-none"
          />
          <span className="ml-2">Cash</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="payment_type"
            id="bank"
            value="Bank"
            checked={formData.payment_type === 'Bank'}
            onChange={handleInputChange}
            className="form-radio text-red-500 focus:ring-0 focus:outline-none"
          />
          <span className="ml-2">Bank</span>
        </label>
      </div>
          </div>
          
        </div>
        {formData.payment_type==='Bank' && (
          <div className='flex justify-between items-center gap-2 my-2 '>
          
          <div className="w-full">
            <label htmlFor="bank_transaction_reference">Bank Reference Number</label>
              <input
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='Bank Reference Number'
                type="text"
                name="bank_transaction_reference"
                id="bank_transaction_reference"
                value={formData.bank_transaction_reference}
                onChange={handleInputChange}
              />
                  
          </div>
          <div className="w-full">
            <label htmlFor="bank_name">Bank Name</label>
            <input
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='Bank Name...'
                type="text"
                name="bank_name"
                id="bank_name"
                value={formData.bank_name}
                onChange={handleInputChange}
              />
          </div>
        </div>
        )}
        {formData.payment_type==='Mpesa' && (
          <div className='flex justify-between items-center gap-2 my-2 '>
          
          <div className="w-full">
            <label htmlFor="mpesa_transaction_id">Mpesa Transaction Number</label>
              <input
                className='w-full rounded-lg border-[1px] py-2 px-2 border-black outline-none focus:border-[1px] p-0'
                placeholder='Mpesa Transaction Number'
                type="text"
                name="mpesa_transaction_id"
                id="mpesa_transaction_id"
                value={formData.mpesa_transaction_id}
                onChange={handleInputChange}
              />
                  
          </div>
        </div>
        )}
        <div className='flex justify-between items-center my-3'>
          <button type='button' onClick={handleClose} className='bg-gray-300 w-[80px] py-2 px-3 rounded-lg'>Close</button>
          <button type='submit' className='bg-primary py-2 px-3 rounded-lg'>Add Payment</button>
        </div>
      </form>
    </div>
  );
};

export default AddPayment;
