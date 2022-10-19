import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from './SideBar.module.scss';
import { FaUserAlt } from 'react-icons/fa';
import { MdDashboard, MdCreateNewFolder } from 'react-icons/md';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Header } from '../index';
import { Modal } from '../index.js';

const SideNav = ({ children }) => {
  const { user, logoutUser, toggleModal } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menu = [
    { path: '/dashboard', name: 'Dashboard', icon: <MdDashboard /> },
    { path: '/createjob', name: 'Create Job', icon: <MdCreateNewFolder /> },
    { path: '/edituser', name: 'Profile', icon: <FaUserAlt /> },
  ];

  return (
    <>
      {user && (
        <div className={style.container}>
          <div style={{ width: isOpen ? '15.75rem' : '3rem' }} className={style.sidebar}>
            <div className={style.topSection}>
              <Link to='/dashboard'>
                <h1 style={{ display: isOpen ? 'block' : 'none' }} className={style.logo}>
                  Job Tracker
                </h1>
              </Link>
              <div style={{ marginLeft: isOpen ? '5rem' : '0px' }} className={style.bars}>
                <FiMenu onClick={toggle} />
              </div>
            </div>
            {menu.map((item, index) => {
              return (
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) => (isActive ? style.activeStyle : style.link)}
                >
                  <div className={style.icon}>{item.icon}</div>
                  <div style={{ display: isOpen ? 'block' : 'none' }} className={style.text}>
                    {item.name}
                  </div>
                </NavLink>
              );
            })}
            <NavLink onClick={logoutUser} className={style.link}>
              <div className={style.icon}>
                <FiLogOut />
              </div>
              <div style={{ display: isOpen ? 'block' : 'none' }} className={style.text}>
                Logout
              </div>
            </NavLink>
          </div>
          <div className={style.right}>
            <Header /> <main className={style.main}>{children}</main>
          </div>
        </div>
      )}
      {toggleModal && <Modal />}
      {!user && <main>{children}</main>}
    </>
  );
};

export default SideNav;
