import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../../../component/admin-panel-components/admin-topbar/topbar.component";
import { ProductsContext } from "../../../context/admin/products.context";
import { SellersContext } from "../../../context/admin/sellers.context";

import "./create-seller-order.style.css";

const DEFAULT_QUANTITY = {
  Small_Qty: 0,
  Medium_Qty: 0,
  Large_Qty: 0
}

const CreateSellerOrder = ({
  DemandId,
  SellerId,
  Small,
  Medium,
  Large,
  isOrderCardOpen,
  setIsOrderCardOpen,
}) => {


  const { allProducts } = useContext(ProductsContext);
  const { createSellerOrder, updateSellerDemandOrder } = useContext(SellersContext);

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [smallCylinders, setSmallCylinders] = useState([]);
  const [mediumCylinders, setMediumCylinders] = useState([]);
  const [largeCylinders, setLargeCylinders] = useState([]);
  const [cylinders, setCylinders] = useState([]);
  const [quantity, setQuantity] = useState({Small_Qty: 0,Medium_Qty: 0,Large_Qty: 0});
  const [amount, setAmount] = useState("");

  const {Small_Qty, Medium_Qty, Large_Qty} = quantity;

  console.log(cylinders);
  console.log({quantity})

  useEffect(() => {
    let productsAvailable = allProducts.filter((product) => {
      return product.WithSeller === 1;
    });
    setAvailableProducts(productsAvailable);
  }, []);

  

  useEffect(() => {
    let smallCylindersArray = availableProducts.filter((product) => {
      return product.ProductSize == 'small';
    })
    setSmallCylinders(smallCylindersArray)

    let mediumCylindersArray = availableProducts.filter((product) => {
      return product.ProductSize == 'medium';
    })
    setMediumCylinders(mediumCylindersArray)

    let largeCylindersArray = availableProducts.filter((product) => {
      return product.ProductSize == 'large';
    })
    setLargeCylinders(largeCylindersArray)
    
  }, [availableProducts])
  

  const removeCylinders = (CylinderId, cylinders) => {
    for (let i = 0; i < cylinders.length; i++) {
      if (cylinders[i] === CylinderId) {
        cylinders.splice(i, 1);
        return cylinders;
      }
    }
  };

  const handleOnChangeSmall = (e) => {
    let target = e.target;
    let CylinderId = e.target.value;
    if (target.checked) {
      let newQuantity = quantity;
      newQuantity.Small_Qty++;
      console.log('setting quantity in change samll')
      setQuantity({...newQuantity})
      let newArray = cylinders;
      newArray.push(CylinderId);
      setCylinders(newArray);
    } else {
      let newQuantity = quantity;
      newQuantity.Small_Qty--;
      setQuantity({...newQuantity})
      let newArray = removeCylinders(CylinderId, cylinders);
      setCylinders(newArray);
    }
  };
  const handleOnChangeMedium = (e) => {
    let target = e.target;
    let CylinderId = e.target.value;
    if (target.checked) {
      let newQuantity = quantity;
      newQuantity.Medium_Qty++;
      console.log('setting quantity in change medium')
      setQuantity({...newQuantity})
      let newArray = cylinders;
      newArray.push(CylinderId);
      setCylinders(newArray);
    } else {
      let newQuantity = quantity;
      newQuantity.Medium_Qty--;
      setQuantity({...newQuantity})
      let newArray = removeCylinders(CylinderId, cylinders);
      setCylinders(newArray);
    }
  };
  const handleOnChangeLarge = (e) => {
    let target = e.target;
    let CylinderId = e.target.value;
    if (target.checked) {
      let newQuantity = quantity;
      newQuantity.Large_Qty++;
      console.log('setting quantity in change large')
      setQuantity({...newQuantity})
      let newArray = cylinders;
      newArray.push(CylinderId);
      setCylinders(newArray);
    } else {
      let newQuantity = quantity;
      newQuantity.Large_Qty--;
      setQuantity({...newQuantity})
      let newArray = removeCylinders(CylinderId, cylinders);
      setCylinders(newArray);
    }
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;
    setAmount(value);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    console.log({quantity})
    createSellerOrder({ Cylinders: cylinders, Amount: amount, quantity, SellerId });
    console.log('setting quantity to default 2')
    let newQunatity = quantity;
    newQunatity.Small_Qty = 0;
    newQunatity.Medium_Qty = 0;
    newQunatity.Large_Qty = 0;
    setQuantity({...newQunatity});
    console.log('demand id is', DemandId);
    if (DemandId) {
      updateSellerDemandOrder(DemandId)
    }
    setTimeout(() => {
      setIsOrderCardOpen(false);
    }, 500);
    setOrderSuccess(true);
  };

  const toggelOrderCard = () => {
    setIsOrderCardOpen(false);
  };

  return (
    <div className="create-seller-order-container">
      <div style={{ boxSizing: "border-box", padding: "15px" }}>
        <h1>Create Order</h1>
        <div
          style={{
            height: "310px",
            boxSizing: "border-box",
            padding: "10px",
          }}
        >
          {orderSuccess === false ? (
            <form
              style={{
                boxSizing: "border-box",
                padding: "20px 15px",
                border: "1px solid grey",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              <div style={{ margin: "5px 0px" }}>
                <h3 style={{ margin: "5px 0px" }}>Demand</h3>
                <span style={{ marginRight: "10px" }}>
                  Small: <span>{Small}</span>
                </span>
                <span style={{ marginRight: "10px" }}>
                  Medium: <span>{Medium}</span>
                </span>
                <span style={{ marginRight: "10px" }}>
                  Large: <span>{Large}</span>
                </span>
              </div>
              <h3>Available Cylinders</h3>
              <div className="cylinders-category-container">
                <div>
                  <h3>Small</h3>
                  <div className="cylinders-category-wrapper">
                  {smallCylinders.length !== 0 &&
                    smallCylinders.map((product) => {
                      const { ProductId, MFID } = product;
                      return (
                        <div key={ProductId}>
                          <input
                            type="checkbox"
                            name={MFID}
                            value={ProductId}
                            onChange={handleOnChangeSmall}
                          />
                          <label> {MFID}</label>
                          <br />
                        </div>
                      );
                    })}
                    </div>
                </div>
                <div>
                  <h3>Medium</h3>
                  <div className="cylinders-category-wrapper">
                  {mediumCylinders.length !== 0 &&
                    mediumCylinders.map((product) => {
                      const { ProductId, MFID } = product;
                      return (
                        <div key={ProductId}>
                          <input
                            type="checkbox"
                            name={MFID}
                            value={ProductId}
                            onChange={handleOnChangeMedium}
                          />
                          <label> {MFID}</label>
                          <br />
                        </div>
                      );
                    })}
                    </div>
                </div>
                <div>
                  <h3>Large</h3>
                  <div className="cylinders-category-wrapper">
                  {largeCylinders.length !== 0 &&
                    largeCylinders.map((product) => {
                      const { ProductId, MFID } = product;
                      return (
                        <div key={ProductId}>
                          <input
                            type="checkbox"
                            name={MFID}
                            value={ProductId}
                            onChange={handleOnChangeLarge}
                          />
                          <label> {MFID}</label>
                          <br />
                        </div>
                      );
                    })}
                    </div>
                </div>
              </div>
              <input
                className="create-seller-order-amount"
                type="text"
                placeholder="Enter Amount"
                value={amount}
                onChange={handleAmountChange}
              />
              <br />
              <br />
              <div style={{ margin: "5px 0px" }}>
                <h3 style={{ margin: "5px 0px" }}>Selected Cylinders</h3>
                <span style={{ marginRight: "10px" }}>
                  Small: <span>{Small_Qty}</span>
                </span>
                <span style={{ marginRight: "10px" }}>
                  Medium: <span>{Medium_Qty}</span>
                </span>
                <span style={{ marginRight: "10px" }}>
                  Large: <span>{Large_Qty}</span>
                </span>
              </div>
              <button
                style={{
                  marginTop: "10px",
                  boxSizing: "border-box",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={handleCreateOrder}
              >
                Confirm
              </button>
            </form>
          ) : (
            <div>
              <h3>Order Created Successfully</h3>
            </div>
          )}
        </div>
        <div
          onClick={toggelOrderCard}
          style={{ cursor: "pointer", marginTop: "200px" }}
        >
          <h2>Go To All Orders</h2>
        </div>
      </div>
    </div>
  );
};

export default CreateSellerOrder;
