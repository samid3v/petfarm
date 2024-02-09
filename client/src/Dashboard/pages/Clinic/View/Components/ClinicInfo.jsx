import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useApp } from '../../../../hooks/useApp'
import api from '../../../../helpers/axiosInstance'
import moment from 'moment-timezone';
import BasicModal from '../../../../components/Modal'
import AddPayment from './AddPayment'
import LargeDevice from './TableComponent/LargeDevice'
import trasactionUrl from '../../../../urls/transaction'
import random from '../../../../urls/random'
import SmallDevice from './TableComponent/SmallDevice';

const ClinicInfo = ({id}) => {
     const [loading, setLoading] = useState()
     const [treatment, setTreatment] = useState([])
     const [transactions, setTransactions] = useState([])
     const [transactId, setTransactId] = useState(0)
     const { setShowLoader } = useApp();

     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);

     useEffect(()=>{
        getSingleTreatment()        
     },[])

     useEffect(()=>{
        if (transactId!==0) {
          getTransactionInfo()
          
        }
     },[transactId])

     const getSingleTreatment = async () => {
      try {
        setShowLoader(true)
  
        if (id !== 0) {
          const response = await api.get(random.get_single_model.url, {
            params: { 
              id: id,
              model:'Appointments'
             },
          });
    
          if (response.status === 200) {
            console.log(response.data)
            setTreatment(response.data);
            setTransactId(response.data._id)
          } else {
            toast.error('Failed to fetch Appointment');
          }
        }
      } catch (error) {
        setShowLoader(false);
        toast.error(error.message);
      } finally {
        setShowLoader(false);
      }
    };

        const getTransactionInfo = async () => {
          try {
            setShowLoader(true)
      
              const response = await api.get(trasactionUrl.get_all.url, {
               params: { pay_id: treatment._id },
              });
        
              if (response.status === 200) {
                console.log(response.data)
                setTransactions(response.data);
              } else {
                toast.error('Failed to fetch patient');
              }
           
          } catch (error) {
            toast.error(error.message);
          } finally {
            setShowLoader(false);
          }
        };

        const refreshData = () =>{
          getSingleTreatment()
          getTransactionInfo()
        }

        const dateFormat = (dateString) =>{
          const dateMoment = moment.utc(dateString);

          const nairobiDateMoment = dateMoment.tz('Africa/Nairobi');

          const formattedNairobiDate = nairobiDateMoment.format('dddd, MMMM Do YYYY');
         
          return formattedNairobiDate
        }

  return (
    <>
     <div className='flex justify-between w-[90%] mx-auto '>
          <div>
               <h3 className='font-semibold text-lg text-gray-600'>Owner Info</h3>
               <div>
                    <p className='text-md text-gray-600 font-semibold'>Name: <span className='text-gray-500'>{treatment?.module_id?.patient?.owner?.name}</span></p>
               </div>
          </div>
          <div>
               <h3 className='text-center font-semibold text-lg text-gray-600'>Patient Info</h3>
               <div>
                    <p className='text-md text-gray-600 font-semibold'>Name: <span className='text-gray-500'>{treatment?.module_id?.patient?.name}</span></p>
               </div>
          </div>
          <div>
               <h3 className='font-semibold text-lg text-gray-600'>Vet Info</h3>
               <div>
                    <p className='text-md text-gray-600 font-semibold'>Name: <span className='text-gray-500'>{treatment?.module_id?.vet?.name}</span></p>
               </div>
          </div>
          
     </div>
     <div className='flex flex-col gap-2 w-[90%] mx-auto my-6'>
          <h3 className='font-semibold text-lg text-gray-600'>Appointment Info</h3>
          <div>
               <p className='text-md text-gray-600 font-semibold'>Appointment Reason: <span className='text-gray-500'>{treatment?.module_id?.reason}</span></p>
          </div>
          <div>
               <p className='text-md text-gray-600 font-semibold'>Date: <span className='text-gray-500'>{dateFormat(treatment?.module_id?.date)}</span></p>
          </div>
          <div>
               <p className='text-md text-gray-600 font-semibold'>Notes: <span className='text-gray-500'>{treatment?.module_id?.notes}</span></p>
          </div>
          <div>
               <p className='text-md text-gray-600 font-semibold'>Amount: <span className='text-gray-500'>{treatment?.amount}</span></p>
          </div>
          
          <div>
               <p className='text-md text-gray-600 font-semibold'>Balance: <span className='text-gray-500'>{treatment?.payment_bal}</span></p>
          </div>
          <div>
               <p className='text-md text-gray-600 font-semibold'>Status: <span className={`text-black text-sm font-normal ${treatment.status==='Pending'? 'bg-yellow-600':'bg-green-600'} rounded-2xl px-3 py-1`}>{treatment?.status}</span></p>
          </div>
     </div>
     <div>
          <div className='flex justify-end items-center'>
            {treatment?.status ==='Pending' && (
               <button onClick={handleOpen} type="button" className='rounded-lg text-neutral w-40 bg-primary px-3 py-2'>Add Payment</button>
            )}
          </div>
      <BasicModal open={open} element={<AddPayment refreshData={refreshData} id={treatment?._id} handleClose={handleClose}/>}/>
     <LargeDevice transactions={transactions} refreshData={refreshData} />
     <SmallDevice transactions={transactions} refreshData={refreshData} />
     </div>
    </>
  )
}

export default ClinicInfo