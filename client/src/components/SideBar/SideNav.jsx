import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './SideBar.module.scss';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { MdDashboard, MdCreateNewFolder } from 'react-icons/md';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import useWindowSize from '../../hooks/useWindowSize';
import { useAuthContext } from '../../hooks/useAuthContext';

const SideNav = ({ children }) => {
  const { user, logoutUser } = useAuthContext();
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
          <div style={{ width: isOpen ? '300px' : '50px' }} className={style.sidebar}>
            <div className={style.topSection}>
              <h1 style={{ display: isOpen ? 'block' : 'none' }} className={style.logo}>
                Title
              </h1>
              <div style={{ marginLeft: isOpen ? '120px' : '0px' }} className={style.bars}>
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
          <main className={style.main}>{children}</main>
        </div>
      )}
      {!user && <main>{children}</main>}
    </>
  );
};

export default SideNav;
