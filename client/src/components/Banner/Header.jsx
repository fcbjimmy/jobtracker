import { useState } from 'react';
import style from './Header.module.scss';
import { useAuthContext } from '../../hooks/useAuthContext';

const Header = () => {
  const { user } = useAuthContext();

  return (
    <header className={style.head}>
      <div className={style.header}>Welcome {user.name} 👋</div>
    </header>
  );
};

export default Header;
