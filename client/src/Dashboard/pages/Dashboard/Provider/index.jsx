import React, { useEffect, useState } from 'react'
import DashContext from '../Context'
import { toast } from 'react-toastify';
import api from '../../../helpers/axiosInstance';
import analytics from '../../../urls/analytics';

const DashProvider = ({children}) => {

     const [stats, setStats] = useState([])
     const [upcomingAppointments, setUpcomingAppointments] = useState([])
     const [upcomingVaccines, setUpcomingVaccines] = useState([])

     useEffect(()=>{
          getStats()
          getUpcomingClinics()
          getUpcomingVaccines()
     },[])

     const getStats = async () => {
          try {
      
            
              const response = await api.get(analytics.module_stats.url);
        
              if (response.status === 200) {
                console.log(response.data)
                setStats(response.data);
              } else {
                toast.error('Failed to fetch patient');
              }
            
          } catch (error) {
            toast.error(error.message);
          }
        };
     const getUpcomingClinics = async () => {
          try {
      
            
              const response = await api.get(analytics.upcoming_appointments.url);
        
              if (response.status === 200) {
                console.log('upAppo',response.data)
                setUpcomingAppointments(response.data);
              } else {
                toast.error('Failed to fetch patient');
              }
            
          } catch (error) {
            toast.error(error.message);
          }
        };
        const getUpcomingVaccines = async () => {
          try {
      
            
              const response = await api.get(analytics.upcoming_vaccines.url);
        
              if (response.status === 200) {
                console.log('upVacc',response.data)
                setUpcomingVaccines(response.data);
              } else {
                toast.error('Failed to fetch patient');
              }
            
          } catch (error) {
            toast.error(error.message);
          }
        };
  return (
    <DashContext.Provider value={{
          stats,
          upcomingAppointments,
          upcomingVaccines
    }}>
     {children}
    </DashContext.Provider>
  )
}

export default DashProvider