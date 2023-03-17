import { useContext } from "react"
import SellerConfirmOrderCard from "../../../component/seller-panel-components/seller-confirm-order-card/seller-confirm-order-card.component"
import Topbar from "../../../component/seller-panel-components/seller-topbar/topbar.component"
import { SellerOrdersContext } from "../../../context/seller/seller-orders.context"

const SellerConfirmationOrders = () => {
    const {sellerConfirmationOrders} = useContext(SellerOrdersContext)
    console.log({sellerConfirmationOrders})

  return (
    <div>
        <Topbar />
        <div style={{width: '100%', marginTop: '50px'}}>
            <h2 style={{marginLeft: '20px'}}>Confirm Order</h2>
            {
                sellerConfirmationOrders.length ? (
                    sellerConfirmationOrders.map((order) => {
                        return <SellerConfirmOrderCard key={order.OrderId} order={order} />
                    })
                ) :
                <p>no pending orders</p>
            }
        </div>
    </div>
  )
}

export default SellerConfirmationOrders