import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../../../component/admin-panel-components/admin-topbar/topbar.component";
import { ProductsContext } from "../../../context/admin/products.context";
import { SellersContext } from "../../../context/admin/sellers.context";



const CreateSellerOrder = () => {

  const navigate = useNavigate()

  const {allProducts} = useContext(ProductsContext);
  const {currentSeller, createSellerOrder} = useContext(SellersContext);

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [availableProducts, setAvailableProducts] = useState([])
  const [cylinders, setCylinders] = useState([])
  const [amount, setAmount] = useState("")

  useEffect(() => {
    let productsAvailable = allProducts.filter((product) => {
      return (product.WithSeller === 1)
    })
    setAvailableProducts(productsAvailable)
  }, [])
  
  const removeCylinders = (CylinderId, cylinders) => {
    for (let i = 0; i < cylinders.length; i++) {
      if (cylinders[i] === CylinderId) {
          cylinders.splice(i, 1)
          return cylinders
      }
    }
  }

  const handleOnChange = (e) => {
    let target = e.target
    let CylinderId = e.target.value
    if (target.checked) {
      let newArray = cylinders
      newArray.push(CylinderId)
      setCylinders(newArray)
    } else {
      let newArray = removeCylinders(CylinderId, cylinders)
      setCylinders(newArray)
    }
  }
  
  const handleAmountChange= (e) => {
    let value = e.target.value
    setAmount(value)
  }


  const handleCreateOrder = (e) => {
    e.preventDefault();
    createSellerOrder({Cylinders: cylinders, Amount: amount})
    setTimeout(() => {
      navigate(`/all-sellers/${currentSeller}`)
    }, 500);
    setOrderSuccess(true)
  };




  return (
    <div>
    <Topbar />
    <div style={{ boxSizing: "border-box", padding: "15px" }}>
      <h1>Create Order</h1>
      <div
        style={{
          height: "310px",
          boxSizing: "border-box",
          padding: "10px",
        }}
      >
          {
            (orderSuccess === false) ? (
              <form
            style={{
              boxSizing: "border-box",
              padding: "20px 15px",
              border: "1px solid grey",
              borderRadius: "5px",
            }}
          >
            <h3>Available Cylinders</h3>
            {
              (availableProducts.length !== 0) && availableProducts.map((product) => {
                const {ProductId, MFID} = product
                return (
                  <div key={ProductId}  >
                  <input type="checkbox" name={MFID} value={ProductId} onChange={handleOnChange} />
                  <label> {MFID}</label><br/>
                  </div>
                )
              })
            }
            <input className="mt-2 mb-1" type="text" placeholder="Enter Amount" value={amount} onChange={handleAmountChange} />
            <br />
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
            )
          }
          {/* <div
            style={{
              boxSizing: "border-box",
              padding: "20px 15px",
              border: "1px solid grey",
              borderRadius: "5px",
            }}
          >
            <h3>Your Order</h3>
            
            <button
              style={{
                marginTop: "10px",
                boxSizing: "border-box",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              onClick={handleCreateOrder}
            >
              Edit Order
            </button>
          </div> */}
      </div>
        <Link to="/all-sellers">
      <h2>
      Go To All Orders
      </h2>
        </Link>
    </div>
    </div>
  );
};

export default CreateSellerOrder;
