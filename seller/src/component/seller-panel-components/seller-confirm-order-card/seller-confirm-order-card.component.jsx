import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { SellerOrdersContext } from '../../../context/seller/seller-orders.context';
import './seller-confirm-order-card.style.css'



const SellerConfirmOrderCard = ({order}) => {
    const {OrderId, Amount, Small, Medium, Large} = order;

    const {confirmSellerOrder, cancelSellerOrder} = useContext(SellerOrdersContext)


    const handleConfirmOrder = () => {
        confirmSellerOrder(order);
    }

    const handleCancelOrder = () => {
        cancelSellerOrder(order)
    }
    
  return (
    <div className="seller-confirm-order-card-container">
        <div className="seller-confirm-order-card-wrapper">
        <div className="seller-confirm-order-card-title">Order Summary</div>
        <div className="seller-confirm-order-card-content">Order Id #<span><b>{OrderId}</b></span></div>
        <div className="seller-confirm-order-card-content">Small: <span><b>{Small}</b></span></div>
        <div className="seller-confirm-order-card-content">Medium: <span><b>{Medium}</b></span></div>
        <div className="seller-confirm-order-card-content">Large: <span><b>{Large}</b></span></div>
        <div className="seller-confirm-order-card-content">Amount <span><b>{Amount}</b></span></div>
        </div>
        <div className="seller-confirm-order-card-button-container">
        <button className="seller-confirm-order-card-button" onClick={handleConfirmOrder} ><FontAwesomeIcon icon="fa-solid fa-check" size='lg' />Confirm</button>
        <button className="seller-confirm-order-card-button" onClick={handleCancelOrder} ><FontAwesomeIcon icon="fa-solid fa-xmark" size='lg' />Cancel</button>
        </div>
    </div>
  )
}

export default SellerConfirmOrderCard