import './styles/global.scss';
import { SignUp, Login, Dashboard, CreateJob, EditJob, EditUser, Hero } from './pages';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from './hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { Navbar, SideNav } from './components/';

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <ToastContainer />
      {!user && <Navbar />}
      <SideNav>
        <Routes>
          <Route path='/' element={!user ? <Hero /> : <Navigate to='/dashboard' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/dashboard' />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/createjob' element={user ? <CreateJob /> : <Navigate to='/' />} />
          <Route path='/editjob/:id' element={user ? <EditJob /> : <Navigate to='/' />} />
          <Route path='/edituser' element={user ? <EditUser /> : <Navigate to='/' />} />
        </Routes>
      </SideNav>
    </>
  );
}

export default App;
