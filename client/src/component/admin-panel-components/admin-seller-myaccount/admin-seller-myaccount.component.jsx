import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SellerAuthContext } from "../../../context/seller/seller-auth-context";
import { SellerOrdersContext } from "../../../context/seller/seller-orders.context";
import { useEffect } from "react";
import { httpGetSellerById } from "../../../utils/nodejs/admin";
import { SellersContext } from "../../../context/admin/sellers.context";

//change select option when changing order and transaction

const AdminSellerAccount = () => {
  //getting seller info from seller auth context
  const { SellerId } = useParams()
  const { currentSellerInfo ,changeCurrentSeller, currentSellerOrders, currentSellerTransactions} = useContext(SellersContext)
  // console.log({currentSellerOrders})

  useEffect(() => {
    changeCurrentSeller(SellerId)
  }, [SellerId])

  

  // const { sellerInfo, AddDemandCylinders } = useContext(SellerAuthContext);
  const { AddDemandCylinders } = useContext(SellerAuthContext);

  //getting seller orders and transactions


  const [showList, setShowList] = useState("Order");
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [filteredTransactions, setFilteredTransactions] = useState(null);
  const [orderFilter, setOrderFilter] = useState("All");
  const [transactionFilter, setTransactionFilter] = useState("All");

  const [openDemandCard, setOpenDemandCard] = useState(false)

  const [quantity, setQuantity] = useState("")

  const [isDemandConfirm, setIsDemandConfirm] = useState(true)

  const [demandStatus, setDemandStatus] = useState({success: "none", quantity: 0})

  useEffect(() => {
    setFilteredOrders(currentSellerOrders);
  }, [currentSellerOrders]);


  useEffect(() => {
    setFilteredTransactions(currentSellerTransactions);
  }, [currentSellerTransactions]);

  useEffect(() => {
    if (quantity !== "" && quantity > 0) {
      setIsDemandConfirm(false)
    }
  }, [quantity])



  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value)
  }



  const toggleOpenDemandCard = () => {
    setOpenDemandCard(!openDemandCard)
  }

  const toggleToTransactions = () => {
    setShowList("Transaction");
  };
  const toggleToOrders = () => {
    setShowList("Order");
  };

  const handleFilterForOrders = (e) => {
    setOrderFilter(e.target.value);
  };

  const handleFilterForTransactions = (e) => {
    setTransactionFilter(e.target.value);
  };

  useEffect(() => {
    if (orderFilter === "All") {
      setFilteredOrders(currentSellerOrders);
    } else {
      let newOrderArray = currentSellerOrders.filter((order) => {
        return order.Status === orderFilter;
      });
      setFilteredOrders(newOrderArray);
    }
  }, [orderFilter]);

  useEffect(() => {
    if (transactionFilter === "All") {
      setFilteredTransactions(currentSellerTransactions);
    } else if (transactionFilter === "Debit") {
      let newTransactionArray = currentSellerTransactions.filter((transaction) => {
        return transaction.Process === 1;
      });
      setFilteredTransactions(newTransactionArray);
    } else {
      let newTransactionArray = currentSellerTransactions.filter((transaction) => {
        return transaction.Process === 0;
      });
      setFilteredTransactions(newTransactionArray);
    }
  }, [transactionFilter]);


  const handleAddDemand = async (e) => {
    let showQuantity = quantity
    e.preventDefault();
    AddDemandCylinders(quantity);
    setQuantity("");
    setDemandStatus({success: true, quantity: showQuantity});
    setTimeout(() => {
      setDemandStatus({success: "none", quantity: 0});
      setOpenDemandCard(false);
    }, 1200);
  }

  const decreaseDemandCount = () => {
    if (quantity !== "" && quantity > 0) {
      setQuantity(Number(quantity) - 1)
    }
  }

  const increaseDemandCount = () => {
    if (quantity !== "" && quantity >= 0) {
      setQuantity(Number(quantity) + 1)
    }
  }
  if (currentSellerInfo !== null) {
    const {
      FirmName,
      FirstName,
      LastName,
      PhoneNumber,
      Address,
      City,
      State,
      Balance,
      Count,
      Demand,
    } = currentSellerInfo;

    return (
      <div>
        <div
          className="container-fluid m-auto"
          style={{ position: "relative" }}
        >
          <h1 className="mt-3 mb-1">{FirmName}</h1>
          <p className="mt-1 mb-1">{`${FirstName} ${LastName}`}</p>
          <p className="mt-1 mb-1">{PhoneNumber}</p>
          <p className="mt-1 mb-2">{`${Address}, ${City}, ${State}`}</p>
          <div className="balance-info-wrapper d-flex jc-space-btw">
            <div className="balance-info" style={{ flex: "4.5" }}>
              <p className="balance-item">Balance</p>
              <p className="balance-number cta-link-2">{`₹ ${Balance}`}</p>
            </div>
            <div className="balance-info" style={{ flex: "3" }}>
              <p className="balance-item">Count</p>
              <p className="balance-number cta-link-2">{Count}</p>
            </div>
            <div className="balance-info" style={{ flex: "3" }}>
              <p className="balance-item">Demand</p>
              <p className="balance-number dngr">{Demand}</p>
            </div>
          </div>
          <div className="mt-3 d-flex jc-space-btw">
            <Link to="/admin/create-seller-order" className="btn cta-btn-bg light-text f-weight-800"
            onClick={toggleOpenDemandCard}>
              Create Seller Order
            </Link>
          </div>
          {openDemandCard && (
            <div className="add-seller-demand-wrapper">
              <form className="add-seller-demand-form">
                <div className="add-seller-demand-quantity-wrapper">
                <div className="change-seller-demand" onClick={decreaseDemandCount}>-</div>
                <input
                  placeholder="Quantity"
                  className="add-seller-demand-quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <div className="change-seller-demand" onClick={increaseDemandCount}>+</div>
                </div>
                {demandStatus.success === true && (
                  <div
                    className="success"
                    style={{ fontSize: "15px", marginBottom: "10px" }}
                  >
                    Demand of {demandStatus.quantity} cylinders added successfully
                  </div>
                )}
                <button
                  className="add-seller-demand-confirm"
                  disabled={isDemandConfirm}
                  onClick={handleAddDemand}
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
            </div>
          )}
          <div className="order-transaction-tab-wrapper mt-3 mb-3">
            <hr className="type-selector-top" />
            <div className="type-selector-wrapper d-flex jc-space-btw">
              <div
                className="type-selector-order"
                style={{
                  backgroundColor:
                    showList === "Order" ? "#7ed95769" : "lightgray",
                  opacity: showList === "Order" ? "100%" : "45%",
                }}
                onClick={toggleToOrders}
              >
                Orders
              </div>
              <div
                className="type-selector-transaction"
                style={{
                  backgroundColor:
                    showList === "Transaction" ? "#7ed95769" : "lightgray",
                  opacity: showList === "Transaction" ? "100%" : "45%",
                }}
                onClick={toggleToTransactions}
              >
                Transaction
              </div>
            </div>

            <div className="seller-order-filter-wrapper">
              <div className="seller-order-filter-title d-flex">
                <span className="f-size-1 f-weight-400">Filter</span>
                <FontAwesomeIcon icon="fa-solid fa-filter" size="lg" />
              </div>
                <select
                  name="Order-Filter"
                  id="seller-order-filter"
                  onChange={handleFilterForOrders}
                  style={{display: (showList !== "Order") ? 'none': 'block'}}
                >
                  <option value="All">All</option>
                  <option value="Booked">Booked</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select
                  name="Transaction-Filter"
                  id="seller-transaction-filter"
                  onChange={handleFilterForTransactions}
                  style={{display: (showList === "Order") ? 'none': 'block'}}
                >
                  <option value="All">All</option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
            </div>

            {/* Order Tab */}

            {showList === "Order" ? (
              <div>
                <div className="seller-tab-list">
                  {filteredOrders &&
                    filteredOrders.map((order) => {
                      const {
                        OrderId,
                        Payload,
                        Status,
                        CreatedAt,
                        DeliveredAt,
                      } = order;
                      let str = "" + OrderId;
                      let pad = "0000";
                      let NewOrderId =
                        pad.substring(0, pad.length - str.length) + str;
                      return (
                        <div className="seller-cards-basic" key={OrderId}>
                          <p style={{ margin: "0 0 2px 0" }}>
                            <b>{`Order ID #${NewOrderId}`}</b>
                          </p>
                          <p style={{ margin: "0px" }}>
                            <span>Quantity: {Payload && Payload.length}</span>
                          </p>
                          <p style={{ textAlign: "right", margin: "0px" }}>
                            Delivery status: {Status}
                          </p>
                          <div className="date-wrapper d-flex jc-space-btw">
                            <span className="order-created-date">
                              {CreatedAt}
                            </span>
                            <span className="delivered-date">
                              {DeliveredAt}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              //Transaction tab
              <div>
                <div className="seller-tab-list">
                  {filteredTransactions &&
                    filteredTransactions.map((transaction) => {
                      const {
                        TransactionId,
                        Process,
                        Amount,
                        Method,
                        OrderId,
                        TransactionDate,
                      } = transaction;
                      let str = "" + TransactionId;
                      let pad = "0000";
                      let NewTransactionId =
                        pad.substring(0, pad.length - str.length) + str;
                      //for order id
                      let str1 = "" + OrderId;
                      let NewOrderId = pad.substring(0, pad.length - str1.length) + str1;
                      return (
                        <div className="seller-cards-basic" key={TransactionId}>
                          <p className="mt-1 mb-2">
                            <b>{`Transction ID #${NewTransactionId}`}</b>
                          </p>
                          <div className="d-flex jc-space-btw">
                            <div className="d-flex" style={{ gap: "15px" }}>
                              {Process === 1 ? (
                                <FontAwesomeIcon
                                  icon="fa-solid fa-arrow-up-right-from-square"
                                  size="2xl"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon="fa-solid fa-arrow-up-right-from-square"
                                  rotation={180}
                                  size="2x"
                                />
                              )}
                              <p
                                style={{ margin: "1px 0px", fontSize: "13px" }}
                              >
                                {Process === 1 ? (
                                  <span>
                                    Money added to account <br /> via {Method}{" "}
                                  </span>
                                ) : (
                                  <span>
                                    Paid for Cylinder Order <br />
                                    Order Id <b>#{NewOrderId}</b>
                                  </span>
                                )}
                              </p>
                            </div>
                            <div>
                              <b>
                                {Process === 1 ? (
                                  <span className="success">+ {Amount}</span>
                                ) : (
                                  <span className="dngr">- {Amount}</span>
                                )}
                              </b>
                            </div>
                          </div>
                          <p className="transaction-date">{TransactionDate}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <h2>loading...</h2>;
  }
};

export default AdminSellerAccount;
