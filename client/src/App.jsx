import './styles/global.scss';
import { AnimatedRoutes } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from './hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { Navbar, SideNav } from './components/';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Job Tracker</title>
          <link rel='canonical' href='https://www.tacobell.com/' />
        </Helmet>
        <ToastContainer />
        {!user && <Navbar />}
        <AnimatedRoutes />
      </HelmetProvider>
    </>
  );
}

export default App;
