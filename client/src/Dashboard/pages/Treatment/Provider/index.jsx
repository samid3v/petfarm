import React, { useEffect, useState } from 'react'
import api from '../../../helpers/axiosInstance';
import customersUrl from '../../../urls/customers';
import { toast } from 'react-toastify';
import { useApp } from '../../../hooks/useApp';
import BoardingContext from '../context';
import boardingUrl from '../../../urls/boarding';
import TreatmentContext from '../context';
import treatmentUrl from '../../../urls/treatment';
import random from '../../../urls/random';


const TreatmentProvider = ({children}) => {
     const [currentPage, setCurrentPage] = useState(1)
     const [currentId, setCurrentId] = useState(0)
     const [statusId, setStatusId] = useState(null)
     const [totalPages, setTotalPages] = useState(0)
      const [treaments, setTreatments] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const { setShowLoader } = useApp();
      const [currentTreatment, setCurrentTreatment] =useState([])
      const [patients, setPatients] = useState([])
      const [users, setUsers] = useState([])

 

useEffect(()=>{
      getAllTreatments(currentPage,10)
   },[])

   useEffect(()=>{
    if (searchTerm.length<3) {
      
      getAllTreatments(currentPage,10)
    }

},[searchTerm])

   useEffect(()=>{
    getAllTreatments(currentPage,10)
 },[currentPage])

 
   useEffect(()=>{
     if (currentId!==0) {
      getSingleTreatment()
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
  

 
  const getSingleTreatment = async () => {
    try {
      setShowLoader(true)

      if (currentId !== 0) {
        const response = await api.get(random.get_single_model.url, {
          params: { 
            id: currentId,
            model:'Treatments'
           },
        });
  
        if (response.status === 200) {
          console.log(response.data)
          setCurrentTreatment(response.data);
        } else {
          toast.error('Failed to fetch patient');
        }
      }
    } catch (error) {
      setShowLoader(false);
      toast.error(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  const refreshTreatments = () => {
    getAllTreatments(currentPage,10)
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

   

  const getAllTreatments = async (page, pageSize) =>{
     try{
      setShowLoader(true);

    const response = await api.get(treatmentUrl.get_all.url, {
      params: { 
        page, 
        pageSize,
      }
    })
    if (response.status === 200) {
      const { data, totalPages } = response.data;

     

      setTreatments(data);
      console.log(data)
      setTotalPages(totalPages)
    } else {
      console.error('Failed to fetch patients');
    }
    
    }catch(error){
        toast.error(error.message)

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

const refreshInfo = () => {
  getPatients()
  getUsers()
}

  return (
    <TreatmentContext.Provider value={{
     totalPages, 
     setTotalPages,
     currentPage, 
     setCurrentPage,
     currentId, 
     setCurrentId,
     treaments, 
     setTreatments,
     searchTerm, 
     setSearchTerm,
     updateSearchResults,
     refreshTreatments,
     currentTreatment, 
     setCurrentTreatment,
     statusId, 
     setStatusId,
     patients,
     users,
     refreshInfo
     
    }}>
      {/* <Modal/> */}
      {/* <DeleteModal/> */}

          {children}
    </TreatmentContext.Provider>
  )
}

export default TreatmentProvider