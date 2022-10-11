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
      <Jobs />
      <div>Dashboard</div>
      <h1>Welcome {user?.name}</h1>
      <h2>Email: {user?.email}</h2>
      {!isLoading &&
        user &&
        jobs?.map((job, index) => {
          const { _id: jobId } = job;
          console.log(jobId);
          return (
            <div key={index}>
              <h1>{index}</h1>
              <h1>Company: {job.company}</h1>
              <p>Position: {job.position}</p>
              <p>Status: {job.status}</p>
              <div onClick={() => navigate(`/editjob/${index}`)}>Edit</div>

              <div onClick={() => deleteSingleJob({ jobId })}>Delete</div>
            </div>
          );
        })}
      {jobs?.length === 0 && <div>No JOBS</div>}
      <button onClick={logoutUser}>Log out</button>
      <h2 onClick={() => navigate('/createjob')}>Create Job</h2>
    </>
  );
};

export default Dashboard;
