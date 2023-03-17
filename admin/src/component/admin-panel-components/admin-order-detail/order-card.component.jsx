import {useState} from 'react'
import './admin-order.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OrderCard = () => {
    // tabs
    const [ OrderTab, setOrderTab ] = useState('SELLER')
    const toggleToSeller = () => {
        setOrderTab('SELLER')
    }

    const toggleToCustomer = () => {
        setOrderTab('CUSTOMER')
    }

    // expandable card
    const [ isMoreDetailOpen, setIsMoreDetailOpen ] = useState(false)
    // const [ background, setbackground ] = useState(false)
    const [ rotation, setRotation ] = useState(0)

    const moredetailToggle = () => {
      if (isMoreDetailOpen === false) {
        setIsMoreDetailOpen(true)
        setRotation(270)
      }
      else {
        setIsMoreDetailOpen(false)
        setRotation(0)
      }
    }
  return (
    <div>
        <div className='tab mt-2'>
            <button className='tablinks' onClick={toggleToSeller}>Your Orders</button>
            <button className='tablinks' onClick={toggleToCustomer}>Customer Orders</button>
        </div>
        {/* Seller Orders Section */}
        { (OrderTab === 'SELLER') ? 
            <div id="SELLER" className='tabcontent'>
                <div className='cards-container mt-2'>
                    <div className='cards-basic secondary-bg m-auto p'>
                        <div className='card-details padding-10'>
                            <p className='f-weight-600'>Order: <span>#1001</span></p>
                            <p>Quantity: <span>150</span></p>
                            <p>Order Date: <span>16-11-22</span></p>
                            <p>Payment Status: <span>Paid</span></p>
                        </div>
                        <span onClick={moredetailToggle} className='f-size-0 padding-10 cta-link'>More Details
                        <FontAwesomeIcon icon="fa-solid fa-chevron-down" rotation={`${rotation}`}/>
                        </span>
                        { isMoreDetailOpen && 
                        <div className='more-details padding-10'>
                            <p className='f-size-0'>Small Quanity: <span>20</span></p>
                            <p className='f-size-0'>Large Quanity: <span>35</span></p>
                            <p className='f-size-0'>Order Status: <span>Dispatched</span></p>
                            <Link to='/seller-customer-order' className='f-size-0 cta-link-2'>Edit Order</Link>
                        </div>
                        }
                    </div>
                </div>
            </div>

        : <div id="CUSTOMER" className='tabcontent'>
            <div className='cards-container mt-2'>
                <div className='cards-basic secondary-bg m-auto p'>
                    <div className='card-details padding-10'>
                        <p className='f-weight-600'>Order #1021</p>
                        <p>Quantity: <span>005</span></p>
                        <p>Order Date: <span>15-11-22</span></p>
                        <p>Payment Mode: <span>Credit Card</span></p>
                    </div>
                    <span onClick={moredetailToggle} className='f-size-0 padding-10 cta-link'>More Details
                        <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                    </span>
                    { isMoreDetailOpen && 
                    <div className='more-details padding-10'>
                        <p className='f-size-0'>Small Quanity: <span>20</span></p>
                        <p className='f-size-0'>Large Quanity: <span>35</span></p>
                        <p className='f-size-0'>Order Status: <span>Dispatched</span></p>
                        <Link to='/seller-customer-order' className='f-size-0 cta-link-2'>Edit Order</Link>
                    </div>
                    }
                </div>
            </div>
        </div>
        }
        <div className='bottom-btn'>
            <Link className='btn cta-btn-bg-2 cta-btn-text f-size-0 mr-2'>Create New Order</Link>
            <Link className='btn cta-btn-bg-2 cta-btn-text f-size-0'>Order Cylinders</Link>
        </div>
    </div>
  );
};

export default OrderCard;