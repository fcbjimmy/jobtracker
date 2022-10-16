import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Summary } from '../components';
import { useAuthContext } from '../hooks/useAuthContext';
import { Jobs, Container } from '../components';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user, allJobs, jobs, isLoading } = useAuthContext();
  const [filteredValue, setFilteredValue] = useState('');
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <Summary />
      {!isLoading && user && (
        <Container title={'Jobs'} filter={true} setFilteredValue={setFilteredValue}>
          <Jobs filteredValue={filteredValue} />
          {jobs?.length === 0 && (
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>No Jobs</div>
          )}
        </Container>
      )}
    </motion.div>
  );
};

export default Dashboard;
