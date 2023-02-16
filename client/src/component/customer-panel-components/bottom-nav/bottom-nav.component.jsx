import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './bottom-nav.styles.css'

const BottomNav = () => {
    return (
        <div className='bottom-nav-container'>
            <div className='bottom-nav-order'>
                <FontAwesomeIcon icon="fa-solid fa-store" />
                <p>Order</p>
            </div>
            <div className='bottom-nav-history'>
                <FontAwesomeIcon icon="fa-solid fa-store" />
                <p>History</p>
            </div>
        </div>
    )
}

export default BottomNav;