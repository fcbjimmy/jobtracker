import "./App.css";
import { SignUp, Login, Dashboard, CreateJob } from "./pages";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createjob" element={<CreateJob />} />
      </Routes>
    </>
  );
}

export default App;
