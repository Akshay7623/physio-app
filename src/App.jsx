import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Page404 from './pages/Page404'
import Login from './pages/Login'
import Register from './pages/Register'
import Appointment from './pages/Appointment'
import TreatmentsPage from './pages/TreatmentsPage'
import EditProfile from './pages/EditProfile'
import Profile from './pages/Profile'
import SavedAddresses from './pages/SavedAddresses'
import AddAddress from './Components/AddAddress'
import EditAddress from './Components/EditAddress'
import AppointmentHistory from './pages/AppointmentHistory'
import SecuritySettings from './pages/SecuritySettings'
import FAQ from './pages/FAQ'
import BookAppointment from './pages/BookAppointment'
import FAQouter from './pages/FAQouter'
import Tnc from './pages/Tnc'
import PrivacyPolicy from './pages/PrivacyPolicy'
import AdminLogin from './pages/Admin/AdminLogin';
import AdminHome from './pages/Admin/AdminHome'
import Users from './pages/Admin/Users'
import Treatment from './Components/Treatment'
import GoogleAuth from './Components/GoogleAuth'
import ResetPass from './pages/ResetPass'
import ClosePage from './pages/ClosePage'
import OrthopedicInDetails from './pages/OrthopedicInDetails'
import NueroInDetails from './pages/NueroInDetails'
import Appointments from './pages/Admin/Appointments'
import UpcomingAppointments from './pages/Admin/UpcomingAppoints'
import CompletedAppointments from './pages/Admin/CompletedAppointments'
import SinglePostOperative from './Components/SinglePostOperative'
import AssignAppointment from './pages/Admin/AssignAppointment'
import AllPhysio from './pages/Admin/AllPhysio'
import AssignedAppointments from './pages/Admin/AssignedAppointments'
import Blog1 from './pages/blogs/Blog1'
import Blog2 from './pages/blogs/Blog2'
import Blog3 from './pages/blogs/Blog3'
import Blog4 from './pages/blogs/Blog4'
import Blogs from './pages/Blogs'

function NoScrollRestore({ children }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  return children;
}

function App() {

  return (
    <NoScrollRestore>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/about' Component={About} />
        <Route path='/contact' Component={Contact} />
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
        <Route path='/appointment' Component={Appointment} />
        <Route path='/book-appointment' Component={BookAppointment} />
        <Route path='/treatments' Component={TreatmentsPage} />
        <Route path='/edit-profile' Component={EditProfile} />
        <Route path='/profile' Component={Profile} />
        <Route path='/saved-addresses' Component={SavedAddresses} />
        <Route path='/add-new-address' Component={AddAddress} />
        <Route path='/edit-address/:id' Component={EditAddress} />
        <Route path='/appointment-history' Component={AppointmentHistory} />
        <Route path='/security-settings' Component={SecuritySettings} />
        <Route path='/faq' Component={FAQ} />
        <Route path='/treatment/:id' Component={Treatment} />
        <Route path='/orthopedic' Component={OrthopedicInDetails} />
        <Route path='/nuero' Component={NueroInDetails} />


        <Route path='/faq-outer' Component={FAQouter} />
        <Route path='/reset-password' Component={ResetPass} />
        <Route path='/tnc' Component={Tnc} />
        <Route path='/privay-policy' Component={PrivacyPolicy} />
        <Route path='/google_auth/:token' Component={GoogleAuth} />
        <Route path='/close_page' Component={ClosePage} />
        <Route path='/post-operative/:id' Component={SinglePostOperative} />




        <Route path='/blogs' Component={Blogs} />
        <Route path='/blog/importance-stretching-physiotherapy' Component={Blog1} />
        <Route path='/blog/role-exercise-prescription-physiotherapy' Component={Blog2} />
        <Route path='/blog/benefits-aquatic-therapy-physiotherapy' Component={Blog3} />
        <Route path='/blog/role-manual-therapy-physiotherapy' Component={Blog4} />



        <Route path='/admin/login' Component={AdminLogin} />
        <Route path='/admin/home' Component={AdminHome} />
        <Route path='/admin/users' Component={Users} />
        <Route path='/admin/appointments/all' Component={Appointments} />
        <Route path='/admin/appointments/upcoming' Component={UpcomingAppointments} />
        <Route path='/admin/appointments/completed' Component={CompletedAppointments} />
        <Route path='/admin/assign' Component={AssignAppointment} />
        <Route path='/admin/assigned' Component={AssignedAppointments} />


        <Route path='/admin/physio' Component={AllPhysio} />



        <Route path='/*' Component={Page404} />
      </Routes>
    </NoScrollRestore>
  )
}

export default App
