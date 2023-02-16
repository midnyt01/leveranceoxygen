import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ProductsContext } from "../../../context/admin/products.context";
import { SellersContext } from "../../../context/admin/sellers.context";
import { httpUpdateSellerReturnOrder } from "../../../utils/nodejs/admin";

import "./admin-seller-return-order-card.style.css";

const AdminSellerReturnOrderCard = ({ order }) => {
  const {
    CreatedAt,
    ReceivedAt,
    ReturnOrderId,
    Status,
    SellerId,
    IsCompleted,
  } = order;
  let str = "" + ReturnOrderId;
  let pad = "0000";
  let NewReturnOrderId = pad.substring(0, pad.length - str.length) + str;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(Status);

  const { allProducts, updateAllProducts, withSellerProducts, findProductsWithSeller } = useContext(ProductsContext);
  const {updateSellerReturnOrderstatus} = useContext(SellersContext)

  const [isDisable, setIsDisable] = useState(false);

  const [cylinders, setCylinders] = useState([]);



  useEffect(() => {
    if (orderStatus == "Received") {
      setIsDisable(true);
    }
  }, []);

  const handleOpenEdit = () => {
    findProductsWithSeller(SellerId);
    setIsEditOpen(true)
  }

  const handleToggleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleOnChange = (e) => {
    let value = e.target.value;
    setOrderStatus(value);
  };

  const removeCylinders = (CylinderId, cylinders) => {
    for (let i = 0; i < cylinders.length; i++) {
      if (cylinders[i] === CylinderId) {
        cylinders.splice(i, 1);
        return cylinders;
      }
    }
  };

  const handleOnCylinderChange = (e) => {
    let target = e.target;
    let CylinderId = e.target.value;
    if (target.checked) {
      let newArray = cylinders;
      newArray.push(CylinderId);
      setCylinders(newArray);
    } else {
      let newArray = removeCylinders(CylinderId, cylinders);
      setCylinders(newArray);
    }
  };

  const handleReturnCylinders = async () => {
    console.log({ Status: orderStatus, Cylinders: cylinders });
    updateSellerReturnOrderstatus(
      { Status: orderStatus, Cylinders: cylinders },
      ReturnOrderId, SellerId
    );
        setIsEditOpen(false);
      if (orderStatus == "Received") {
        setIsDisable(true);
      }
  };

  return (
    <div
      id="SELLER"
      className="tabcontent"
      style={{
        width: "80%",
        border: "1px solid gray",
        borderRadius: "5px",
        margin: "10px auto",
        cursor: "pointer",
      }}
    >
      {/* <div className="cards-container mt-2" style={{ position: "relative" }}>
        <div className="cards-basic secondary-bg m-auto"> */}
          <div className="card-details padding-5">
            <p style={{ margin: "0 0 2px 0" }}>
              <b>{`Return Order ID #${NewReturnOrderId}`}</b>
            </p>
            <p style={{ textAlign: "right", margin: "0px" }}>
              Delivery status: {orderStatus}
            </p>
            <div className="date-wrapper d-flex jc-space-btw">
              <span className="order-created-date">{CreatedAt}</span>
              <span className="delivered-date">{ReceivedAt}</span>
            </div>
          </div>
          <p>
            <button
              className="mt-1 mb-1 border-none cursor-p"
              disabled={isDisable}
              onClick={handleOpenEdit}
              style={{
                cursor: isDisable ? "not-allowed" : "pointer",
                opacity: isDisable ? "40%" : "100%",
              }}
            >
              <span className="success" >
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" size="lg" />
              </span>
            </button>
          </p>
        {/* </div> */}
        {isEditOpen && (
          <div className="return-order-status-container">
            <div>
              {IsCompleted === 1 ? (
                <h3>Order completed cannot change further</h3>
              ) : (
                <div>
                  <label>Delivery Status</label>
                  <select
                    name="delivery-status"
                    value={orderStatus}
                    onChange={handleOnChange}
                  >
                    <option value="Booked">Booked</option>
                    <option value="Intransit">Intransit</option>
                    <option value="Received">Received</option>
                  </select>
                  {orderStatus === "Received" && (
                    <div>
                      <h3>Select Cylinders</h3>
                      {(withSellerProducts != null) && withSellerProducts.map((cylinder) => {
                        const { ProductId, MFID } = cylinder;
                        return (
                          <div key={ProductId}>
                            <input
                              type="checkbox"
                              name={MFID}
                              value={ProductId}
                              onChange={handleOnCylinderChange}
                            />
                            <label> {MFID}</label>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <button onClick={handleReturnCylinders}>Confirm </button>
                </div>
              )}
            </div>
            <div
              style={{
                position: "absolute",
                fontSize: "20px",
                right: "10px",
                top: "50px",
              }}
              onClick={handleToggleEdit}
            >
              <b>X</b>
            </div>
          </div>
        )}
      {/* </div> */}
    </div>
  );
};

export default AdminSellerReturnOrderCard;
