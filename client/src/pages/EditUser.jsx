import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '../hooks/useAuthContext';

export const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email!').required('Email is required!'),
  name: yup.string().required('Name is required!'),
});

const EditUser = () => {
  const { user, isLoading, editUserInfo } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: user?.name, email: user?.email },
  });

  const onSubmitHandler = (data) => {
    editUserInfo({ data });
  };

  return (
    <>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <p>{errors.name?.message}</p>
        <label htmlFor='name'>Name</label>
        <input {...register('name')} type='name' id='name' placeholder='Name' />
        <p>{errors.email?.message}</p>
        <label htmlFor='email'>Email</label>
        <input {...register('email')} type='email' placeholder='Email' id='email' />
        <button disabled={isLoading} type='submit'>
          Submit
        </button>
      </form>
    </>
  );
};

export default EditUser;
