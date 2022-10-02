import { useState, useEffect } from "react";
import axios from "../APIs/endpoint";
import useAxiosFetch from "../hooks/useAxiosFetch";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [data, error, loading, axiosFetch] = useAxiosFetch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/user/showCurrentUser", {
          withCredentials: true,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.get("/api/v1/auth/logout", {
  //       withCredentials: true,
  //     });
  //     console.log(response);
  //     console.log("logout");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleLogout = async () => {
    axiosFetch({
      axiosInstance: axios,
      method: "get",
      url: "/auth/logout",
    });
  };

  return (
    <>
      <div>Dashboard</div>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
};

export default Dashboard;
