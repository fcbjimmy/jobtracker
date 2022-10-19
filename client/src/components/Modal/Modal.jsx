import style from './Modal.module.scss';
import { useAuthContext } from '../../hooks/useAuthContext';

const Modal = () => {
  const { jobs, deleteSingleJob, toggleModal, setToggleModal, deleteJobId } = useAuthContext();
  console.log(deleteJobId);

  return (
    <div className={style.modal}>
      <div className={style.content}>Are you sure you want to delete this job application</div>
      <div className={style.options}>
        <span className={style.yes} onClick={() => deleteSingleJob({ deleteJobId })}>
          Yes
        </span>{' '}
        <span className={style.no} onClick={() => setToggleModal(!toggleModal)}>
          No
        </span>
      </div>
    </div>
  );
};

export default Modal;
