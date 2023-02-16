import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import AdminSellerReturnOrderCard from "../../../component/admin-panel-components/admin-seller-return-order-card/admin-seller-return-order-card.component";import AdminSellerOrderCard from "../../../component/admin-panel-components/admin-seller-return-order-card/admin-seller-return-order-card.component";
import Topbar from "../../../component/admin-panel-components/admin-topbar/topbar.component";
import { SellersContext } from "../../../context/admin/sellers.context";

const AdminSellerReturnOrders = () => {
  const { sellerReturnOrders } = useContext(SellersContext);
  const [filter, setFilter] = useState();
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    setFilteredOrders(sellerReturnOrders)
  }, [sellerReturnOrders])

  const filterToCompleted = () => {
    setFilter("Complete");
    let filteredArray = sellerReturnOrders.filter((order) => {
        return order.IsCompleted === 1;
      });
      setFilteredOrders(filteredArray);
  };

  const filterToInCompleted = () => {
    setFilter("Incomplete");
    let filteredArray = sellerReturnOrders.filter((order) => {
        return order.IsCompleted !== 1;
      });
      setFilteredOrders(filteredArray);
  };

    if (sellerReturnOrders.length !== 0) {
        return (
            <div>
              <Topbar />
              <div className="d-flex jc-space-btw w-90 m-auto mt-2 mt-2 f-size-1">
                Filter Orders
                <div>
                  <button
                    className="mr-1"
                    style={{
                      backgroundColor: filter === "Incomplete" ? "blue" : "lightblue",
                      border: "none",
                      color: "white",
                      boxSizing: "border-box",
                      padding: "7px 10px",
                      borderRadius: "5px",
                    }}
                    onClick={filterToInCompleted}
                  >
                    InCompleted
                  </button>
                  <button
                    className="ml-1"
                    style={{
                      backgroundColor: filter === "Complete" ? "blue" : "lightblue",
                      border: "none",
                      color: "white",
                      boxSizing: "border-box",
                      padding: "7px 10px",
                      borderRadius: "5px",
                    }}
                    onClick={filterToCompleted}
                  >
                    Completed
                  </button>
                </div>
              </div>
              <div style={{position: 'relative'}}>
              {
              filteredOrders &&
                filteredOrders.map((order) => {
                  return (
                    <div key={order.ReturnOrderId}>
                      <AdminSellerReturnOrderCard order={order} />
                    </div>
                  );
                })
                }
                </div>
            </div>
          );
    } else {
        return (
            <h4>loading...</h4>
        )
    }
};

export default AdminSellerReturnOrders;
