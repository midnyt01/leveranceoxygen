import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './topbar.styles.css'

const Topbar = () => {
  return (
    <div>
      <div className="topbar-container">
        <div className="location-container light-text">
          <FontAwesomeIcon icon="fa-solid fa-location-dot" />
          <span className='my-location light-text'>My location</span>
        </div>
        <Link to='/user-profile' className="user light-text">
          <FontAwesomeIcon icon="fa-solid fa-bell" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
