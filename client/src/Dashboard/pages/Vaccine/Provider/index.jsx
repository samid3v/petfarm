import React, { useEffect, useState } from 'react'
import api from '../../../helpers/axiosInstance';
import customersUrl from '../../../urls/customers';
import { toast } from 'react-toastify';
import { useApp } from '../../../hooks/useApp';
import VaccineContext from '../context';
import random from '../../../urls/random';
import vaccineUrl from '../../../urls/vaccine';


const VaccineProvider = ({children}) => {
     const [currentPage, setCurrentPage] = useState(1)
     const [currentId, setCurrentId] = useState(0)
     const [statusId, setStatusId] = useState(null)
     const [totalPages, setTotalPages] = useState(0)
      const [vaccines, setVaccines] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const { setShowLoader } = useApp();
      const [currentVaccine, setCurrentVaccine] =useState([])
      const [patients, setPatients] = useState([])
      const [users, setUsers] = useState([])

 

useEffect(()=>{
      getAllVaccines(currentPage,10)
   },[])

   useEffect(()=>{
    if (searchTerm.length<3) {
      
      getAllVaccines(currentPage,10)
    }

},[searchTerm])

   useEffect(()=>{
    getAllVaccines(currentPage,10)
 },[currentPage])

 
   useEffect(()=>{
     if (currentId!==0) {
      getSingleVaccine()
     }
   },[currentId])

 
  const getSingleVaccine = async () => {
    try {
      setShowLoader(true)

      if (currentId !== 0) {
        const response = await api.get(random.get_single_model.url, {
          params: { 
            id: currentId,
            model:'Vaccines'
           },
        });
  
        if (response.status === 200) {
          console.log(response.data)
          setCurrentVaccine(response.data);
        } else {
          toast.error('Failed to fetch patient');
        }
      }
    } catch (error) {
      setShowLoader(false);
      toast.error(error.response.data.error);
    } finally {
      setShowLoader(false);
    }
  };

  const refreshVaccines = () => {
    getAllVaccines(currentPage,10)
  }

  
  const getAllVaccines = async (page, pageSize) =>{
     try{
      setShowLoader(true);

    const response = await api.get(vaccineUrl.get_all.url, {
      params: { 
        page, 
        pageSize,
      }
    })
    if (response.status === 200) {
      const { data, totalPages } = response.data;

     

      setVaccines(data);
      console.log(data)
      setTotalPages(totalPages)
    } else {
      console.error('Failed to fetch Vaccines');
    }
    
    }catch(error){
        toast.error(error.response.data.error)

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
    <VaccineContext.Provider value={{
     totalPages, 
     setTotalPages,
     currentPage, 
     setCurrentPage,
     currentId, 
     setCurrentId,
     vaccines,
     setVaccines, 
     searchTerm, 
     setSearchTerm,
     refreshVaccines,
     currentVaccine, 
     setCurrentVaccine,
     statusId, 
     setStatusId,
     patients,
     users,
     refreshInfo
     
    }}>
      {/* <Modal/> */}
      {/* <DeleteModal/> */}

          {children}
    </VaccineContext.Provider>
  )
}

export default VaccineProvider