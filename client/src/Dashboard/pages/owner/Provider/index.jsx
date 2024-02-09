import React, { useEffect, useState } from 'react'
import patientUrl from '../../../urls/patients';
import api from '../../../helpers/axiosInstance';
import customersUrl from '../../../urls/customers';
import { toast } from 'react-toastify';
import { useApp } from '../../../hooks/useApp';
import OwnersContext from '../context';


const OwnerProvider = ({children}) => {
     const [patients, setPatients] = useState([]);
     const [currentPage, setCurrentPage] = useState(1)
     const [currentId, setCurrentId] = useState(0)
     const [totalPages, setTotalPages] = useState(0)
     const [currentCustomer, setCurrentCustomer] = useState([])
      const [customers, setCustomers] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const { setShowLoader } = useApp();
 

useEffect(()=>{
      getAllCustomers(currentPage,10)

   },[])

   useEffect(()=>{
    if (searchTerm.length<3) {
      
      getAllCustomers(currentPage,10)
    }

},[searchTerm])

   useEffect(()=>{
    getAllCustomers(currentPage,10)
 },[currentPage])

   useEffect(()=>{
     if (currentId!==0) {
      getSingleCustomer()
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
  

 
  const getSingleCustomer = async () => {
    try {
      setShowLoader(true)

      if (currentId !== 0) {
        const response = await api.get(customersUrl.get_single_customer.url, {
          params: { id: currentId },
        });
  
        if (response.status === 200) {
          console.log(response)
          setCurrentCustomer(response.data);
        } else {
          toast.error('Failed to fetch patient');
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  const refreshOwners = () => {
    getAllCustomers(currentPage,10)
  }
  
  const updateSearchResults = async () => {
    
    try {
      setShowLoader(true);

      const response = await api.get(customersUrl.search_customer.url, {
        params: { value:searchTerm },
      });
      // console.log(searchTerm)
      if (response.status === 200) {
        setCustomers(response.data);
      } else {
        toast.error('Failed to fetch customer');
      }
      
    }  catch (error) {
      toast.error(error.message);
    } finally {
      setShowLoader(false);
      setTotalPages(0)

    }
    

    
  };
  

  const getAllCustomers = async (page, pageSize) =>{
     try{
    const response = await api.get(customersUrl.get_all.url, {
      params: { page, pageSize }
    })
    if (response.status === 200) {
      const { data, totalPages } = response.data;

     

      setCustomers(data);
      console.log(response.data)
      setTotalPages(totalPages)
    } else {
      console.error('Failed to fetch patients');
    }
    
    }catch(error){
        console.log(error)
    };

    
 
}
  return (
    <OwnersContext.Provider value={{
     patients,
     totalPages, 
     setTotalPages,
     currentPage, 
     setCurrentPage,
     currentCustomer, 
     setCurrentCustomer,
     currentId, 
     setCurrentId,
     getAllCustomers,
     customers,
     searchTerm, 
     setSearchTerm,
     updateSearchResults,
     refreshOwners
     
    }}>
      {/* <Modal/> */}
      {/* <DeleteModal/> */}

          {children}
    </OwnersContext.Provider>
  )
}

export default OwnerProvider