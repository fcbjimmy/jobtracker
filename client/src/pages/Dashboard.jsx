import { useEffect } from "react";
import axios from "../APIs/endpoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const { user, logoutUser, allJobs, jobs, isLoading } = useAuthContext();
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      allJobs();
    }

    if (user === null) {
      navigate("/");
    }
  }, [user]);

  console.log("testing", jobs);

  return (
    <>
      <div>Dashboard</div>
      <h1>Welcome {user?.name}</h1>
      <h2>Email: {user?.email}</h2>
      {!isLoading &&
        user &&
        jobs.map((job, index) => {
          return (
            <div key={index}>
              <h1>{index}</h1>
              <h1>Company: {job.company}</h1>
              <p>Position: {job.position}</p>
              <p>Status: {job.status}</p>
            </div>
          );
        })}
      <button onClick={logoutUser}>Log out</button>
      <h2 onClick={() => navigate("/createjob")}>Create Job</h2>
    </>
  );
};

export default Dashboard;
