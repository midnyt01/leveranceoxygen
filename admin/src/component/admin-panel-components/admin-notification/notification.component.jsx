import { Link } from 'react-router-dom';

import './notification-bar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react';
import { AdminNotificationsContext } from '../../../context/admin/admin-notifications.context';


const NotificationPanel = ({notificationToggle}) => {

  const {notificationCount, setNotificationCount , adminNotifications, setAdminNotifications} = useContext(AdminNotificationsContext)

  const handleClearNotification = () => {
    setAdminNotifications([])
    setTimeout(() => {
      notificationToggle()
    }, 300);
  }

  const findAndRemove = (id) => {
    let newArray = adminNotifications
    for (let i = 0; i < newArray.length; i++) {
      if (adminNotifications[i].messageId === id) {
        newArray.splice(i, 1);
        break;
      }
    }
    notificationToggle()
    setAdminNotifications(newArray)
    let count = notificationCount;
    count--
    setNotificationCount(count)
  }



  return (
    <div>
      <div className='notification'>
        <ul className='notification-modal pt-3 pb-2 pr-2'>
          <span onClick={notificationToggle} className='notification-close f-size-1'>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </span>
            {
              (adminNotifications.length === 0) ? (
                <p>
                  no new notification
                </p>
              ) : (
                <div>
                  {
                    adminNotifications.map((notification) => {
                      const {messageId, message, messageLink } = notification;
                      return (
                        <li key={messageId} onClick={() => findAndRemove(messageId)} value={messageId} ><Link to={messageLink}>{message}</Link></li>
                      )
                    })
                  }
                </div>
              )
            }
        <div onClick={handleClearNotification}>Clear All</div>
        </ul>
      </div>
    </div>
  );
};

export default NotificationPanel;