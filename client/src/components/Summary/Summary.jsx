import React from 'react';
import style from './Summary.module.scss';
import { useAuthContext } from '../../hooks/useAuthContext.js';

const Summary = () => {
  const { jobs } = useAuthContext();
  const offers = jobs?.filter((item) => item.status === 'Offer').length;
  const interviews = jobs?.filter((item) => item.status === 'Interview').length;
  const declined = jobs?.filter((item) => item.status === 'Declined').length;
  const pending = jobs?.filter((item) => item.status === 'Pending').length;

  return (
    <header className={style.header}>
      <div className={style.title}>Summary</div>
      <div className={style.summary}>
        <span className={style.offer}>
          OFFERS <span className={style.digit}>{offers}</span>
        </span>
        <span className={style.interview}>
          INTERVIEWS <span className={style.digit}>{interviews}</span>
        </span>
        <span className={style.decline}>
          DECLINED <span className={style.digit}>{declined}</span>
        </span>
        <span className={style.pending}>
          PENDING <span className={style.digit}>{pending}</span>
        </span>
      </div>
    </header>
  );
};

export default Summary;
