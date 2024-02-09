import React, { useEffect, useState } from 'react'
import api from '../../../helpers/axiosInstance';
import customersUrl from '../../../urls/customers';
import { toast } from 'react-toastify';
import { useApp } from '../../../hooks/useApp';
import BoardingContext from '../context';
import boardingUrl from '../../../urls/boarding';
import ClinicContext from '../context';
import clinicUrl from '../../../urls/clinic';
import random from '../../../urls/random';


const ClinicProvider = ({children}) => {
     const [currentPage, setCurrentPage] = useState(1)
     const [currentId, setCurrentId] = useState(0)
     const [statusId, setStatusId] = useState(null)
     const [totalPages, setTotalPages] = useState(0)
     const [patients, setPatients] = useState([])
      const [clinics, setClinics] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [stats, setStats] = useState([])
      const { setShowLoader } = useApp();
      const [currentBoarder, setCurrentBoarder] =useState([])
      const [users, setUsers] = useState([])

      const [bookingStatus, setBookingStatus] = useState('Booked')
      const [clinicState, setClinicState] = useState('')
 

useEffect(()=>{
      getAllAppointments(currentPage,10)
      getClinicStats()
      getPatients()
  getUsers()

   },[])

   useEffect(()=>{
    getAllAppointments(currentPage,10)
 },[currentPage])

 useEffect(()=>{
  getAllAppointments(currentPage,10)
},[bookingStatus])

   useEffect(()=>{
     if (currentId!==0) {
      getSingleBoarding()
     }
   },[currentId])

   useEffect(()=>{
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length>2) {
        updateSearchResults()
      }
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
    
   },[searchTerm])
  

 
  const getSingleBoarding = async () => {
    try {
      setShowLoader(true)

      if (currentId !== 0) {
        const response = await api.get(random.get_single_model.url, {
          params: { 
            id: currentId,
            model:'Appointments'
           },
        });
  
        if (response.status === 200) {
          console.log(response)
          setCurrentBoarder(response.data);
        } else {
          toast.error('Failed to fetch patient');
        }
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setShowLoader(false);
    }
  };

  const refreshclinics = () => {
    getAllAppointments(currentPage,10)
  }
  
  const updateSearchResults = async () => {
    
    // try {
    //   setShowLoader(true);

    //   const response = await api.get(customersUrl.search_customer.url, {
    //     params: { value:searchTerm },
    //   });
    //   // console.log(searchTerm)
    //   if (response.status === 200) {
    //     setCustomers(response.data);
    //   } else {
    //     toast.error('Failed to fetch customer');
    //   }
      
    // }  catch (error) {
    //   toast.error(error.message);
    // } finally {
    //   setShowLoader(false);
    //   setTotalPages(0)

    // }
    

    
  };

  useEffect(()=>{
    if (statusId!==null && clinicState!=='') {
      
      updateClinicStatus()
    }
  },[clinicState, statusId])
  

  const getAllAppointments = async (page, pageSize) =>{
     try{
      setShowLoader(true);

    const response = await api.get(clinicUrl.get_all.url, {
      params: { 
        page, 
        pageSize,
        status:bookingStatus  
      }
    })
    if (response.status === 200) {
      const { data, totalPages } = response.data;

     

      setClinics(data);
      console.log(data)
      setTotalPages(totalPages)
    } else {
      console.error('Failed to fetch patients');
    }
    
    }catch(error){
        console.log(error)
    }finally {
      setShowLoader(false);

    };

    
 
}
const getPatients = async () =>{
  try{

 const response = await api.get(random.get_all_patients.url)
 if (response.status === 200) {

  
   setPatients(response.data)
 } else {
   toast.error('Failed to fetch patients');
 }
 
 }catch(error){
     console.log(error)
 }

 

}
const getUsers = async () =>{
  try{

 const response = await api.get(random.get_all_users.url)
 if (response.status === 200) {

  
   setUsers(response.data)
 } else {
   toast.error('Failed to fetch users');
 }
 
 }catch(error){
     console.log(error)
 }

 

}

const updateClinicStatus = async () =>{
  try{
   setShowLoader(true);

 const response = await api.put(clinicUrl.edit_clinic_status.url,null, {
   params: { 
     id:statusId,
     status:clinicState
  
   }
 })
 console.log(response)

 if (response.status === 201) {
  setCurrentId(null)
  refreshStats()
  refreshclinics()
 } else {
   toast.error('Failed to fetch patients');
 }
 
 }catch(error){
     console.log(error)
 }finally {
   setShowLoader(false);

 };

 

}

const refreshStats =()=>{
  getClinicStats()
}

const getClinicStats = async () =>{
     try{

    const response = await api.get(clinicUrl.get_stats.url)
    if (response.status === 200) {
      // const { data, totalPages } = response.data;

     
      setStats(response.data)
      console.log(response.data)
    } else {
      toast.error('Failed to Update appointments Status');
    }
    
    }catch(error){
        toast.error(error.response.data.error)
    }
    
}

const refreshInfo = () => {
  getPatients()
  getUsers()
} 
  return (
    <ClinicContext.Provider value={{
     totalPages, 
     setTotalPages,
     currentPage, 
     setCurrentPage,
     patients,
     currentId, 
     setCurrentId,
     clinics, 
     setClinics,
     searchTerm, 
     setSearchTerm,
     updateSearchResults,
     refreshclinics,
     bookingStatus, 
     setBookingStatus,
     stats, 
     setStats,
     refreshStats,
     clinicState, 
     setClinicState,
     currentBoarder, 
     setCurrentBoarder,
     statusId, 
     setStatusId,
     refreshInfo,
     users
     
    }}>
      {/* <Modal/> */}
      {/* <DeleteModal/> */}

          {children}
    </ClinicContext.Provider>
  )
}

export default ClinicProvider