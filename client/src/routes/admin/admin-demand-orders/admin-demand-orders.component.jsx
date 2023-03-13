import { useContext } from "react";
import DemandOrderCard from "../../../component/admin-panel-components/admin-demand-order-card/admin-demand-order-card.component";
import Topbar from "../../../component/admin-panel-components/admin-topbar/topbar.component";
import { SellersContext } from "../../../context/admin/sellers.context";
import "./admin-demand-orders.style.css"

const DEMAND_ORDERS = [
    {
        DemandId: 1,
        SellerId: 1,
        FirmName: "New Age cylinder",
        Quantity: 10,
        IsCreated: false,
        Date: new Date(),
    },
    {
        DemandId: 2,
        SellerId: 2,
        FirmName: "New sage cylinder",
        Quantity: 10,
        IsCreated: false,
        Date: new Date(),
    }
]


const DemandOrders = () => {

    const {sellerDemandOrders} = useContext(SellersContext);

  return (
    <div>
        <Topbar />
        <div className="admin-demand-orders-container">
            {
                sellerDemandOrders.length && sellerDemandOrders.map((order) => {
                    return (
                        <DemandOrderCard order={order} key={order.DemandId} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default DemandOrders