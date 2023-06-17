import './user-profile.styles.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BottomNav from '../../../component/customer-panel-components/bottom-nav/bottom-nav.component'

const UserProfile = () => {
    return (
        <div className='user-profile-container'>
            {/* User profile container   */}
            <div className="profile-container">
                <div className="text-container">
                    <Link to='/'>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" size='3x'/>
                    </Link>
                    <h3 className='client-name'>Shivam</h3>
                    <span className='view-activity'>View activity
                        <FontAwesomeIcon icon="fa-solid fa-caret-right" />
                    </span>
                </div>
                <div className="profile-image-container">
                    <FontAwesomeIcon icon="fa-solid fa-user" size='4x'/>
                </div>
            </div>

            {/* User profile options container */}
            <div className='user-profile-options-container'>
                <hr className='main-option-horizontal-line' />
                <div className="main-options-container">
                    <div className="main-option">
                        <FontAwesomeIcon icon="fa-solid fa-bookmark" size='xl'/> 
                        <span className='main-option-icon-label'>Bookmarks</span>
                    </div>

                    <div className="main-option">
                        <FontAwesomeIcon icon="fa-solid fa-bell" size='xl'/>
                        <span className='main-option-icon-label'>Notifications</span>
                    </div>

                    <div className="main-option">
                        <FontAwesomeIcon icon="fa-solid fa-screwdriver-wrench" size='xl'/>
                        <span className='main-option-icon-label'>Settings</span>
                    </div>

                    <div className="main-option">
                        <FontAwesomeIcon icon="fa-solid fa-credit-card" size='xl'/>
                        <span className='main-option-icon-label'>Payments</span>
                    </div>
                </div>
                <hr className='main-option-horizontal-line' />
                <p className='other-options-title'>CYLINDER ORDER</p>
                <div className="other-options-container">
                    <Link to='/order-history' className="other-options">
                        <div className='other-option-icon'>
                            <FontAwesomeIcon icon="fa-solid fa-box-open" size='xl'/>
                        </div>
                        <p className='other-option-label'>Your Orders</p>
                    </Link>

                    <div className="other-options">
                        <div className='other-option-icon'>
                            <FontAwesomeIcon icon="fa-solid fa-address-book" size='xl'/>
                        </div>
                        <p className='other-option-label'>Address Book</p>
                    </div>

                    <div className="other-options">
                        <div className='other-option-icon'>
                            <FontAwesomeIcon icon="fa-solid fa-comment-dots" size='xl'/>
                        </div>
                        <p className='other-option-label'>Online Ordering Help</p>
                    </div>

                    <div className="other-options">
                        <div className='other-option-icon'>
                            <FontAwesomeIcon icon="fa-solid fa-circle-info" size='xl'/>
                        </div>
                        <p className='other-option-label'>About</p>
                    </div>
                </div>
            </div>
            <div className="extra-options-container">
                <hr style={{color: 'rgb(239, 239, 239)'}} />
                <p className='extra-option'>Send Feedback</p>
                <p className='extra-option'>Rate us on the Play Store</p>
                <p className='extra-option'>Log Out</p>
            </div>
            <BottomNav />
        </div>
    )
}

export default UserProfile;