import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Dash from './pages/Dashboard'
import Patients from './pages/Patients'
import AllPatients from './pages/Patients/All'
import AppProvider from './providers/appProvider'
import Dashboard from './pages'
import Owners from './pages/owner'
import AllOwners from './pages/owner/All'
import AllBoarders from './pages/Boarding/All'
import Boarding from './pages/Boarding'
import ViewBoarding from './pages/Boarding/View'
import Treatment from './pages/Treatment'
import AllTreatment from './pages/Treatment/All'
import ViewTreatment from './pages/Treatment/View'
import Clinic from './pages/Clinic'
import AllClinics from './pages/Clinic/All'
import ViewClinic from './pages/Clinic/View'
import Vaccine from './pages/Vaccine'
import AllVaccines from './pages/Vaccine/Pages/All'
import ViewVaccine from './pages/Vaccine/Pages/View'
import Login from './login'
import Profile from './pages/Profile'
import Users from './pages/users'
import AllUsers from './pages/users/All'


function App() {
  
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route  path='dashboard' element={<Dashboard/>}>
            <Route index element={<Dash/>} />
            <Route path='profile' element={<Profile/>} />
            <Route path='patients' element={<Patients/>}>
              <Route index element={<AllPatients/>} />
            </Route>
            <Route path='owners' element={<Owners/>}>
              <Route index element={<AllOwners/>} />
            </Route>
            <Route path='users' element={<Users/>}>
              <Route index element={<AllUsers/>} />
            </Route>
            <Route path='boarding' element={<Boarding/>} >
              <Route index element={<AllBoarders/>} />
              <Route path=':id/view' element={<ViewBoarding/>} />
            </Route>
            <Route path='treatment' element={<Treatment/>} >
              <Route index element={<AllTreatment/>} />
              <Route path=':id/view' element={<ViewTreatment/>} />
            </Route>
            <Route path='clinic' element={<Clinic/>} >
              <Route index element={<AllClinics/>} />
              <Route path=':id/view' element={<ViewClinic/>} />
            </Route>
            <Route path='vaccine' element={<Vaccine/>} >
              <Route index element={<AllVaccines/>} />
              <Route path=':id/view' element={<ViewVaccine/>} />
            </Route>
          </Route>
        </Routes>    
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
