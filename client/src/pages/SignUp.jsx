import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { schema } from '../models/signup';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import style from '../styles/SignInUpCard.module.scss';
import { Button } from '../components/';
import { motion } from 'framer-motion';

const SignUp = () => {
  const { user, registerUser, isLoading } = useAuthContext();

  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = async (data) => {
    const { confirmPassword, name, email, password } = data;
    registerUser({ name, email, password });
  };

  useEffect(() => {
    if (user) {
      reset();
      navigate('/dashboard');
    }
  }, [user]);

  // console.log(error?.response?.data);

  // const onSubmitHandler = async (data) => {
  //   // console.log(JSON.stringify(data));
  //   const { confirmPassword, name, email, password } = data;
  //   try {
  //     const response = await axios.post("/auth/register", {
  //       name,
  //       email,
  //       password,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   reset();
  // };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <section className={style.section}>
        <div className={style.container}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h1>Sign Up</h1>
            <ul>
              <li>
                <p className={style.error}>{errors.name?.message}</p>
                <label htmlFor='name'>Name</label>
                <input {...register('name')} type='name' id='name' placeholder='name' />
              </li>
              <li>
                <p className={style.error}>{errors.email?.message}</p>
                <label htmlFor='email'>Email</label>
                <input {...register('email')} type='email' id='email' placeholder='email' />
              </li>
              <li>
                <p className={style.error}>{errors.password?.message}</p>
                <label htmlFor='password'>Password</label>
                <input
                  {...register('password')}
                  type='password'
                  id='password'
                  placeholder='min 6 characters'
                />
              </li>
              <li>
                <p className={style.error}>{errors.confirmPassword?.message}</p>
                <label htmlFor='ConfirmPassword'>Confirm Password</label>
                <input
                  {...register('confirmPassword')}
                  type='password'
                  id='ConfirmPassword'
                  placeholder='Confirm Password'
                />
              </li>
              <li>
                <Button disabled={isLoading} type='submit'>
                  Sign Up
                </Button>
              </li>
              <li>
                <p className={style.paragraph}>
                  Already a member? <Link to='/login'>Login</Link>
                </p>
              </li>
            </ul>
          </form>
        </div>
      </section>
    </motion.div>
  );
};

export default SignUp;
