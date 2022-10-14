import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '../hooks/useAuthContext';
import { FormCard, Button } from '../components';
import style from '../styles/gridEdit.module.scss';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      <FormCard title={'Edit User'}>
        <form className={style.gridEdit} onSubmit={handleSubmit(onSubmitHandler)}>
          <div className={style.labelInput}>
            <p>{errors.name?.message}</p>
            <label htmlFor='name'>Name</label>
            <input {...register('name')} type='name' id='name' placeholder='Name' />
          </div>
          <div className={style.labelInput}>
            <p>{errors.email?.message}</p>
            <label htmlFor='email'>Email</label>
            <input {...register('email')} type='email' placeholder='Email' id='email' />
          </div>
          <div className={style.button}>
            <Button disabled={isLoading} type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </FormCard>
    </motion.div>
  );
};

export default EditUser;
