import React from 'react';
import { Navbar, SideNav } from '../components';
import { SignUp, Login, Dashboard, CreateJob, EditJob, EditUser, Hero } from '../pages';
import { Navigate, useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../hooks/useAuthContext';

const AnimatedRoutes = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <SideNav>
        <Routes key={location.pathname} location={location}>
          <Route path='/' element={!user ? <Hero /> : <Navigate to='/dashboard' />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to='/dashboard' />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/createjob' element={user ? <CreateJob /> : <Navigate to='/' />} />
          <Route path='/editjob/:id' element={user ? <EditJob /> : <Navigate to='/' />} />
          <Route path='/edituser' element={user ? <EditUser /> : <Navigate to='/' />} />
        </Routes>
      </SideNav>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
