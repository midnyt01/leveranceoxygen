import { useEffect, useState } from "react";
import "./admin-order.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { SellersContext } from "../../../context/admin/sellers.context";
import AdminSellerOrderCard from "../admin-seller-order-card/admin-seller-order-card.component";

const OrderCard = () => {
  // tabs
  const [OrderTab, setOrderTab] = useState("SELLER");

  const { sellersOrders } = useContext(SellersContext);
  const [filterBy, setFilterBy] = useState('All')
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (filterBy === "All") {
      setFilteredOrders(sellersOrders);
    } else {
      let newOrderArray = sellersOrders.filter((order) => {
        return order.Status === filterBy;
      });
      setFilteredOrders(newOrderArray);
    }
  }, [sellersOrders]);



  const handleFilterForOrders = (e) => {
    let orderFilter = e.target.value;
    setFilterBy(orderFilter)
    if (orderFilter === "All") {
      setFilteredOrders(sellersOrders);
    } else {
      let newOrderArray = sellersOrders.filter((order) => {
        return order.Status === orderFilter;
      });
      setFilteredOrders(newOrderArray);
    }
  };

  return (
    <div>
      <h2>Seller Orders</h2>
      <div className="seller-order-filter-wrapper">
        <div className="seller-order-filter-title d-flex">
          <span className="f-size-1 f-weight-400">Filter</span>
          <FontAwesomeIcon icon="fa-solid fa-filter" size="lg" />
        </div>
        <select
          name="Order-Filter"
          id="seller-order-filter"
          onChange={handleFilterForOrders}
          // style={{ display: showList !== "Order" ? "none" : "block" }}
        >
          <option value="All">All</option>
          <option value="Booked">Booked</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      {filteredOrders &&
        filteredOrders.map((order) => {
          return (
            <AdminSellerOrderCard key={order.OrderId} order={order} />
          );
        })}
    </div>
  );
};

export default OrderCard;
