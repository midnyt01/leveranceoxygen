import { Link } from 'react-router-dom';
import './admin-sidebar.css'
import leveranceOxygenLogo from "../../assets/leverance_logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const AdminSidebar = ({sidebarToggle}) => {
  return (
    <div>
      <div className='sidenav'>
        <ul className='slideout'>
          <span onClick={sidebarToggle} className='sidenav-close f-size-1'>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </span>
          <img src={leveranceOxygenLogo} alt="Leverance Global Logo" className='main-logo-med padding-10'/>
          <div className='admin-sidenav-links decoration-none'>
            <li>
              <Link to='/admin' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-chart-line"/></span>Dashboard
              </Link>
            </li>
            <li>
              <Link to='/admin/admin-orders' className='decoration-none primary-text'>
              <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-dollar-sign" /></span>Orders
              </Link>
            </li>
            <li>
              <Link to='/admin/seller-return-orders' className='decoration-none primary-text'>
              <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-dollar-sign" /></span>Return Orders
              </Link>
            </li>
            <li>
              <Link to='/admin/add-banner' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-bullhorn"/></span>Banners
              </Link>
            </li>
            <li>
              <Link to='/add-product' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-boxes-stacked"/></span>Products
              </Link>
            </li>
            <li>
              <Link to='/admin-inventory' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-warehouse"/></span>Inventory
              </Link>
            </li>
            <li>
              <Link to='/admin/admin-customer' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-users"/></span>Customers
              </Link>
            </li>
            <li>
              <Link to='/add-seller' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-user-tie"/></span>Sellers
              </Link>
            </li>
            <li>
              <Link to='/all-sellers' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-user-tie"/></span>Seller Accounts
              </Link>
            </li>
            <li>
              <Link to='/admin/enquiries' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-inbox"/></span>Enquiry
              </Link>
            </li>
            <li>
              <Link to='/admin/reports' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-bug"/></span>Report
              </Link>
            </li>
            <li>
              <Link to='/admin/site-settings' className='decoration-none primary-text'>
                <span className='mr-2 f-size-1'><FontAwesomeIcon icon="fa-solid fa-gears"/></span>Site Settings
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;