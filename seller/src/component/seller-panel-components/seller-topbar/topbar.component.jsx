import {useState} from "react";
import { Link } from 'react-router-dom';
import './topbar.styles.css'
import Sidebar from '../sidebar.component'
import NotificationPanel from '../seller-notification/notification.component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from "react";
import { SellerAuthContext } from "../../../context/seller/seller-auth-context";
import { SellerNotificationsContext } from "../../../context/seller/seller-notifications.context";

const Topbar = () => {

  const {setIsSellerLogin} = useContext(SellerAuthContext)
  const {notificationCount} = useContext(SellerNotificationsContext)

  const [ isSidenavOpen, setIsSidenavOpen ] = useState(false)
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
    if (isNotificationOpen === false) {
      setIsNotificationOpen(true)
    }
    else {
      setIsNotificationOpen(false)
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem("seller")
    setIsSellerLogin(false)
  }

  return (
    <div>
      <div className='container'>
        <div className="nav seller-dark-bg">
          <div className="nav-wrapper m-auto w-90 pt-2">
          { isSidenavOpen && <Sidebar sidebarToggle={sidebarToggle} /> }
            <span className='cta-btn-text f-size-1' onClick={sidebarToggle}>
              <FontAwesomeIcon icon="fa-solid fa-bars" />
            </span>
            <Link to='/seller' className='cta-btn-text decoration-none pl-2 f-weight-400 f-size-1'>Seller Panel</Link>
            <div className='navbar-right-icons'>
            { isNotificationOpen && <NotificationPanel notificationToggle={notificationToggle} /> }
              <span className='cta-btn-text f-size-1 pr-2' style={{cursor: 'pointer', position: 'relative'}} onClick={notificationToggle}>
                <FontAwesomeIcon icon="fa-solid fa-bell" />
                {(notificationCount > 0) && <div className='notification-count'>{notificationCount}</div>}
              </span>
              <Link to='/seller-login' onClick={handleLogOut} className='cta-btn-text f-size-1'>
                    <FontAwesomeIcon icon="fa-solid fa-power-off" />
                  </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;

