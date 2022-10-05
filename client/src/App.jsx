import "./App.css";
import { SignUp, Login, Dashboard, CreateJob } from "./pages";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/dashboard" />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/createjob"
          element={user ? <CreateJob /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
