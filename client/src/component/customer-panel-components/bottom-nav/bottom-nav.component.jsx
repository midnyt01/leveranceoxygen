import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './bottom-nav.styles.css'
import { Link } from 'react-router-dom';

const BottomNav = () => {
    return (
        <div className='bottom-nav-container'>
            <div className='bottom-nav-order'>
                <Link to='/'><FontAwesomeIcon icon="fa-solid fa-house" /></Link>
            </div>
            <div className='bottom-nav-history'>
                <Link to='/'><FontAwesomeIcon icon="fa-solid fa-store" /></Link>
            </div>
            <div className='bottom-nav-order'>
                <Link to='/user-profile'><FontAwesomeIcon icon="fa-solid fa-user" /></Link>
            </div>
        </div>
    )
}

export default BottomNav;