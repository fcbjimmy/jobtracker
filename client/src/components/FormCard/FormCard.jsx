import React from 'react';
import style from './FormCard.module.scss';
const FormCard = ({ children, title }) => {
  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <div>{children}</div>
    </div>
  );
};
export default FormCard;
