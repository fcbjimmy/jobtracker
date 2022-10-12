import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Summary } from '../components';
import { useAuthContext } from '../hooks/useAuthContext';
import { Jobs } from '../components';
const Dashboard = () => {
  const { user, logoutUser, allJobs, jobs, isLoading, deleteSingleJob } = useAuthContext();
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      allJobs();
    }

    if (user === null) {
      navigate('/');
    }
  }, [user]);

  console.log('testing', jobs);

  return (
    <>
      <Summary />
      {!isLoading && user && <Jobs />}
      {jobs?.length === 0 && <div>No JOBS</div>}
    </>
  );
};

export default Dashboard;
