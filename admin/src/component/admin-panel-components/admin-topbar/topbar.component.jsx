import {useState} from "react";
import { Link, Outlet } from 'react-router-dom';
import './topbar.styles.css'
import AdminSidebar from '../sidebar.component'
import NotificationPanel from '../admin-notification/notification.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from "react";
import { AdminAuthContext } from "../../../context/admin/auth.context";
import { AdminNotificationsContext } from "../../../context/admin/admin-notifications.context";

const Topbar = () => {
  const [ isSidenavOpen, setIsSidenavOpen ] = useState(false)

  const {isAdminLogin, setIsAdminLogin} = useContext(AdminAuthContext)
  const {notificationCount} = useContext(AdminNotificationsContext)


  const sidebarToggle = () => {
    if (isSidenavOpen === false) {
      setIsSidenavOpen(true)
    }
    else {
      setIsSidenavOpen(false)
    }
  }

  // notification panel
  const [ isNotificationOpen, setIsNotificationOpen ] = useState(false)
  const notificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  const handleLogOut = () => {
    localStorage.removeItem("admin")
    setIsAdminLogin(false)
  }

  return (
    <div>
      <div className='container'>
        <div className="nav admin-dark-bg">
          <div className="nav-wrapper m-auto w-90 pt-2">
          { isSidenavOpen && <AdminSidebar sidebarToggle={sidebarToggle} /> }
            <span className='cta-btn-text f-size-1' onClick={sidebarToggle}>
              <FontAwesomeIcon icon="fa-solid fa-bars" />
            </span>
            <Link href='https://github.com' className='cta-btn-text decoration-none pl-2 f-weight-400 f-size-1'>Admin Panel</Link>
            <div className='navbar-right-icons'>
            { isNotificationOpen && <NotificationPanel notificationToggle={notificationToggle} /> }
              <span className='cta-btn-text f-size-1 pr-2' style={{cursor: 'pointer', position: 'relative'}} onClick={notificationToggle}>
                <FontAwesomeIcon icon="fa-solid fa-bell" />
                {(notificationCount > 0) && <div className='notification-count'>{notificationCount}</div>}
              </span>
              {
                isAdminLogin ? (
                  <Link to='/admin-login' onClick={handleLogOut} className='cta-btn-text f-size-1'>
                    <FontAwesomeIcon icon="fa-solid fa-power-off" />
                  </Link>
                ) : (
                  <Link to='/admin-login'  className='cta-btn-text f-size-1'>
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Topbar;

