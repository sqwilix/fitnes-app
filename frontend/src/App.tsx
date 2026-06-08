import NotAuthRedurect from './Components/Redirects/Not_Auth_Redirect'
import Main from './Pages/Main'
import { Route, Routes, useLocation } from 'react-router-dom'
import Auth from './Pages/Auth'
import Header from './Components/Layout/Header'
import BottomPanel from './Components/Layout/Bottom_Panel'
import HomeClient from './Pages/Client/Home_Client'
import ProtectedRoute from './Components/Redirects/Protected_Route'
import HistoryClient from './Pages/Client/History_Client'
import ProfileClient from './Pages/Client/Profile_Client'
import HomeTrainer from './Pages/Trainer/Home_Trainer'
import ProfileTrainer from './Pages/Trainer/Profile_Trainer'
import TrainerLayout from './Components/Trainer/Trainer_Layout'
import ClientById from './Pages/Trainer/Client_By_Id'
import AdminLayout from './Components/Admin/Admin_Layout'
import HomeAdmin from './Pages/Admin/Home_Admin'
import AdminClientById from './Pages/Admin/Admin_Client_By_Id'


function App() {
  const location = useLocation()

  return(
    <div className="w-full min-h-screen bg-[#001518] flex flex-col text-white">
      {(location.pathname === '/' || location.pathname === '/auth') && (
        <Header/>
      )}

      <Routes>
        <Route path='/' element={
          <NotAuthRedurect>
            <Main/>
          </NotAuthRedurect>
        }/>

        <Route path='/auth' element={
          <NotAuthRedurect>
            <Auth/>
          </NotAuthRedurect>
        }/>

        <Route element={<ProtectedRoute allowedRole='CLIENT'/>}>
          <Route path='/client' element={<HomeClient/>}/>
          <Route path='/client/history' element={<HistoryClient/>}/>
          <Route path='/client/profile' element={<ProfileClient/>}/>
        </Route>

        <Route element={<ProtectedRoute allowedRole='TRAINER'/>}>
          <Route element={<TrainerLayout/>}>
            <Route path='/trainer' element={<HomeTrainer/>}/>
            <Route path='/trainer/profile' element={<ProfileTrainer/>}/>
            <Route path='/trainer/client/:clientId' element={<ClientById/>}/>
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole='ADMIN'/>}>
          <Route element={<AdminLayout/>}>
            <Route path='/admin' element={<HomeAdmin/>}/>
            <Route path='/admin/client/:clientId' element={<AdminClientById/>}/>
          </Route>
        </Route>
      </Routes>

      {location.pathname.startsWith('/client') && (
        <BottomPanel/>
      )}
    </div>
  )
}

export default App
