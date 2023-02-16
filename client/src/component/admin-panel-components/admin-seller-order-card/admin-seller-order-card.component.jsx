import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SellersContext } from "../../../context/admin/sellers.context";
import { useEffect } from "react";
import "../admin-orders/admin-orders.styles.css";

const AdminSellerOrderCard = ({ order }) => {
  const { OrderId, Payload, Status, CreatedAt, DeliveredAt } = order;
  let str = "" + OrderId;
  let pad = "0000";
  let NewOrderId = pad.substring(0, pad.length - str.length) + str;

  const [isMoreDetailOpen, setIsMoreDetailOpen] = useState(false);
  const [orderStatus, setOrderstatus] = useState(Status);
  const [display, setDisplay] = useState("none");
  const [isDisable, setIsDisable] = useState(false);
  const [deliveredAt, setDeliveredAt] = useState(DeliveredAt)

  const [totalQuantity, setTotalQuantity] = useState(0);

  const { updateSellerOrder } = useContext(SellersContext);

  useEffect(() => {
    if (Status === "Delivered") {
      setIsDisable(true);
    }
  }, []);

  const toggleMoreDetails = () => {
    setIsMoreDetailOpen(!isMoreDetailOpen);
  };

  const toggleChangeStatusDisplay = () => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };

  const handleOrderStatusChange = (event) => {
    setOrderstatus(event.target.value);
    console.log(orderStatus);
  };

  const handleUpdateStatus = () => {
    updateSellerOrder(order, orderStatus);
    if (orderStatus === 'Delivered') {
      setIsDisable(true)
      let date = new Date()
      setDeliveredAt(date.toDateString())
    }
    setDisplay("none");
  };

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < order.Payload.length; i++) {
      total += order.Payload[i].Quantity;
    }
    setTotalQuantity(total);
  }, []);


  return (
    <div className="seller-cards-basic" key={OrderId}>
      <p style={{ margin: "0 0 2px 0" }}>
        <b>{`Order ID #${NewOrderId}`}</b>
      </p>
      <p style={{ margin: "0px" }}>
        <span>Quantity: {Payload.length}</span>
      </p>
      <p style={{ textAlign: "right", margin: "0px" }}>
        Delivery status: {Status}
      </p>
      <div className="date-wrapper d-flex jc-space-btw mb-1">
        <span className="order-created-date">{CreatedAt}</span>
        <span className="delivered-date">{deliveredAt}</span>
      </div>
      <span className="cursor-p" onClick={toggleChangeStatusDisplay}>
        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" size="lg" />
      </span>
      {/* edit order status */}
      <div
        className="edit-order-modal"
        style={{
          display: `${display}`,
          height: "250px",
        }}
      >
        <p>Edit Delivery Status for Order # {NewOrderId}</p>
        <label className="mt-2" for="order-status">
          Change Order Status:
        </label>{" "}
        <br />
        <select
          className="edit-modal-dropdown mt-2"
          name="order-status"
          value={orderStatus}
          onChange={handleOrderStatusChange}
        >
          <option value="Booked">Booked</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <br />
        <button
          className="btn mt-3 cta-btn-bg-2 cta-btn-text"
          onClick={handleUpdateStatus}
          disabled={isDisable}
          style={{
            cursor: isDisable ? "not-allowed" : "pointer",
            opacity: isDisable ? "40%" : "100%",
          }}
        >
          Update
        </button>
        <div className="edit-modal-close" onClick={toggleChangeStatusDisplay}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </div>
  );
};

export default AdminSellerOrderCard;
