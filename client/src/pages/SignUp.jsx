import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters long")
    .max(32)
    .required(),
  email: yup
    .string()
    .email("Please enter a valid email!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(5, "Password must be longer than 5 characters!")
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required!")
    .oneOf([yup.ref("password"), null], "Passwords must match!"),
});

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = async (data) => {
    // console.log(JSON.stringify(data));
    const { confirmPassword, name, email, password } = data;
    try {
      const response = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    reset();
  };
  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>{errors.name?.message}</p>
        <label htmlFor="name">Name</label>
        <input {...register("name")} type="name" id="name" placeholder="name" />
        <p>{errors.email?.message}</p>
        <label htmlFor="email">Email</label>
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="email"
        />
        <p>{errors.password?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="min 6 characters"
        />
        <p>{errors.confirmPassword?.message}</p>
        <label htmlFor="ConfirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          type="password"
          id="ConfirmPassword"
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
