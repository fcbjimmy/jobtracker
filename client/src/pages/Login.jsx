import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import { schema } from '../models/login';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button } from '../components/';
import style from '../styles/SignInUpCard.module.scss';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  let navigate = useNavigate();
  const { dispatch, user, loginUser, isLoading } = useAuthContext();

  const onSubmitHandler = async (data) => {
    const { email, password } = data;
    loginUser({ email, password });
  };

  useEffect(() => {
    if (user) {
      reset();
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  }, [user]);

  return (
    <>
      <section className={style.section}>
        <div className={style.container}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <h1>Log In</h1>
            <ul className={style.ulist}>
              <li>
                <p className={style.error}>{errors.email?.message}</p>
                <label htmlFor='email'>Email</label>
                <input {...register('email')} type='email' placeholder='email' id='email' />
              </li>
              <li>
                <p className={style.error}>{errors.password?.message}</p>
                <label htmlFor='password'>Password</label>
                <input
                  {...register('password')}
                  type='password'
                  id='password'
                  placeholder='password'
                />
              </li>
              <li>
                <Button disabled={isLoading} type='submit'>
                  Log In
                </Button>
              </li>
              <li>
                <p className={style.paragraph}>
                  Not a member? <Link to='/signup'>Sign up</Link>
                </p>
              </li>
            </ul>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
