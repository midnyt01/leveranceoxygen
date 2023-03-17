import { useState } from "react";
import "./seller-return-order-details.component.css";
import { useContext } from "react";
import { SellerOrdersContext } from "../../../context/seller/seller-orders.context";
import { SellerAuthContext } from "../../../context/seller/seller-auth-context";
import { useEffect } from "react";
import SellerOrderCard from "../seller-return-order-card/seller-return-order-card.component";

const DEFAULT_QUANTITY = {
  Small : '',
  Medium: '',
  Large: ''
}

const OrderCard = () => {
  const { sellerReturnOrders, addToSellerReturnOrder } = useContext(SellerOrdersContext);
  const { sellerInfo, AddDemandCylinders } = useContext(SellerAuthContext);



  const [isDisabled, setIsDisabled] = useState(true);
  const [openDemandCard, setOpenDemandCard] = useState(false)
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY)
  const [isDemandConfirm, setIsDemandConfirm] = useState(true)
  const [demandStatus, setDemandStatus] = useState({success: "none", quantity: 0})
  const [demandErrorStatement, setDemandErrorStatement] = useState('')

  useEffect(() => {
    if (sellerInfo && sellerInfo.Count > 0) {
      let allComp = true;
      for (let i = 0; i < sellerReturnOrders.length; i++) {
        if (sellerReturnOrders[i].IsCompleted == 0) {
            allComp = false;
            break;
        }
      }
      if (allComp == true) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }
  }, [sellerInfo, sellerReturnOrders])




  useEffect(() => {
    const {Small, Medium, Large} = quantity
    if (sellerInfo && (Small > sellerInfo.Small || Medium > sellerInfo.Medium || Large > sellerInfo.Large)) {
      setDemandErrorStatement('quantity cannot excedes your current cylinder count')
    } else {
      setDemandErrorStatement('')
      if (quantity !== "" && (Small > 0 || Medium > 0 || Large > 0)) {
        setIsDemandConfirm(false)
      }
    }
    
  }, [quantity])




  const handleCreateReturnOrder = () => {

    addToSellerReturnOrder({Status: 'Booked', ReceivedAt: '', IsCompleted: 0}, {Refill: false});
    setIsDisabled(true)
  }

  const toggleOpenDemandCard = () => {
    setOpenDemandCard(!openDemandCard)
  }

  const handleRefillEmptyCylinders = async (e) => {
    const {Small, Medium, Large} = quantity;
    let showQuantity = (Number(Small) + Number(Medium) + Number(Large));
    e.preventDefault();
    addToSellerReturnOrder({Status: 'Booked', ReceivedAt: '', IsCompleted: 0}, {Refill: true});
    setIsDisabled(true)
    AddDemandCylinders({quantity, Refill: true});
    setQuantity(DEFAULT_QUANTITY);
    setDemandStatus({success: true, quantity: showQuantity});
    setTimeout(() => {
      setDemandStatus({success: "none", quantity: 0});
      setOpenDemandCard(false);
      setIsDisabled(true)
    }, 700);
  }

  const handleQuantityChange = (e) => {
    const {name, value} = e.target;
    setQuantity({...quantity, [name] : value});
  }

  
  if (sellerReturnOrders !== null && sellerInfo) {
      
      
    return (
        <div>
          <div className="place-order-main-wrapper">
            <button
              className="place-order-main"
              disabled={isDisabled}
              style={{ backgroundColor: isDisabled ? '#3c3c3c' : 'black', cursor: isDisabled ? 'not-allowed' : 'pointer' }}
              onClick={handleCreateReturnOrder}
            >
              Return Empty Cylinders
            </button>
            <div style={{textAlign: 'center', margin: '5px',fontSize:'20px'}}>OR</div>
            <button
              className="place-order-main"
              disabled={isDisabled}
              style={{ backgroundColor: isDisabled ? '#3c3c3c' : 'black', cursor: isDisabled ? 'not-allowed' : 'pointer' }}
              onClick={toggleOpenDemandCard}
            >
              Refill Empty Cylinders
            </button>
            <div className="cylinder-count-statement">You have {sellerInfo.Count} Cylinders in Your Store</div>
            <div className="f-size-1 f-weight-600 mt-4 mb-1">Your return orders</div>
          </div>
          {/* add demand for refill */}
          {openDemandCard && <div className="add-seller-demand-wrapper">
              <form className="add-seller-demand-form">
                <div className="add-seller-demand-quantity-wrapper">
                  <h3>Enter Cylinder Qunatities</h3>
                <input
                  placeholder="Small"
                  className="add-seller-demand-quantity"
                  name="Small"
                  value={quantity.Small}
                  onChange={handleQuantityChange}
                />
                <input
                  placeholder="Medium"
                  className="add-seller-demand-quantity"
                  name="Medium"
                  value={quantity.Medium}
                  onChange={handleQuantityChange}
                />
                <input
                  placeholder="Large"
                  className="add-seller-demand-quantity"
                  name="Large"
                  value={quantity.Large}
                  onChange={handleQuantityChange}
                />
                </div>
                <p style={{color: 'red'}}>{demandErrorStatement}</p>
                {demandStatus.success === true && (
                  <div
                    className="success"
                    style={{ fontSize: "15px", marginBottom: "10px" }}
                  >
                    Refill Demand of {demandStatus.quantity} cylinders has been send
                  </div>
                )}
                <button
                  className="add-seller-demand-confirm"
                  disabled={isDemandConfirm}
                  onClick={handleRefillEmptyCylinders}
                >
                  Confirm
                </button>
                <span
                  className="add-seller-demand-close"
                  onClick={toggleOpenDemandCard}
                >
                  X
                </span>
              </form>
            </div>}
          {/* Seller Orders Section */}
          {sellerReturnOrders.map((order) => {
            return <SellerOrderCard key={order.ReturnOrderId} order={order} />;
          })}
        </div>
      );;
  } else {
    return (
        <h2>Loading...</h2>
    )
  }
};

export default OrderCard;
