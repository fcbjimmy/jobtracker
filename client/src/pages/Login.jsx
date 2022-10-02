import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  let navigate = useNavigate();

  const onSubmitHandler = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log(response);
      if ((response.status = 200)) {
        toast.success("Logged in", { position: "top-center" });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>{errors.email?.message}</p>
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="email"
          id="email"
        />
        <p>{errors.password?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
