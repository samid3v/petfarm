import React, { useEffect, useState } from 'react'
import appContext from '../context/appContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppProvider = ({children}) => {
     
     const [showLoader, setShowLoader] = useState(false);
     const [modalMessage, setModalMessage] = useState(null);
     const [confirmDelete, setConfirmDelete] = useState(false)
     const [showDeleteModal, setShowDeleteModal] = useState(true)
     const [showFilterModal, setShowFilterModal] = useState(false)
     const [user, setUser] = useState(null)
     const [token, setToken] = useState(null)
     const [tokenStatus, setTokenStatus] = useState(null)
     const [showMobileSidebar, setShowMobileSidebar] = useState(false)


  return (
    <appContext.Provider value={{
      showLoader, 
      setShowLoader,
     modalMessage,
     setModalMessage,
     setConfirmDelete,
     showFilterModal, 
     setShowFilterModal,
     confirmDelete,
     showDeleteModal,
     setShowDeleteModal,
     user, 
     setUser,
     token, 
     setToken,
     tokenStatus, 
     showMobileSidebar, 
     setShowMobileSidebar,
     setTokenStatus
    }}>
      <ToastContainer position='bottom-right' />
     {children}
    </appContext.Provider>
  )
}

export default AppProvider