import { Link } from 'react-router-dom';
import './seller-sidebar.css'
import leveranceOxygenLogo from "../../assets/leverance_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react';
import { SellerAuthContext } from '../../context/seller/seller-auth-context';


const Sidebar = ({sidebarToggle}) => {

  const {sellerInfo} = useContext(SellerAuthContext)
  
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (sellerInfo && sellerInfo.Count > 0) {
        console.log('we are getting inside')
        setIsDisabled(false)
    }
  }, [sellerInfo])

  return (
    <div>
      <div className='sidenav'>
        <ul className='slideout'>
          <span onClick={sidebarToggle} className='sidenav-close f-size-1'>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </span>
          <div className='sidenav-links decoration-none'>
          <li>
              <Link to='/seller/return-orders' className='decoration-none primary-text place-return-order-sidenav'
              style={{ backgroundColor: isDisabled ? '#3c3c3c' : 'black', cursor: isDisabled ? 'not-allowed' : 'pointer' }}
              >
                Place Return Order
              </Link>
            </li>
            <li>
              <Link to='/seller' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-house-chimney"/></span>Home
              </Link>
            </li>
            <li>
              <Link to='/seller/seller-analytics' className='decoration-none primary-text'>
              <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-chart-line" /></span>Sales
              </Link>
            </li>
            <li>
              <Link to='/seller/return-orders' className='decoration-none primary-text'>
              <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-chart-line" /></span>Return Orders
              </Link>
            </li>
            <li>
              <Link to='/seller/return-orders' className='decoration-none primary-text place-return-order-sidenav'
              style={{ backgroundColor: isDisabled ? '#3c3c3c' : 'black', cursor: isDisabled ? 'not-allowed' : 'pointer' }}
              >
                Report Defect Cylinders
              </Link>
            </li>
          </div>
          <div className='bottom-links'>
            <img src={leveranceOxygenLogo} alt="Leverance Global Logo" className='main-logo-med padding-10'/>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;