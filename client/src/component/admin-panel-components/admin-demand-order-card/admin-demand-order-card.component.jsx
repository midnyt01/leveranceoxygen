import { useState } from "react";
import { Link } from "react-router-dom";
import CreateSellerOrder from "../../../routes/admin/seller-create-order/create-seller-order";
import "./admin-demand-order-card.style.css";

// {
//     DemandId: 2,
//     SellerId: 2,
//     FirmName: "New sage cylinder",
//     Quantity: 10,
//     IsCreated: false,
//     Date: new Date(),
// }

function DemandOrderCard({ order }) {
  const { DemandId, SellerId, Small, Medium, Large, FirmName, IsCreated } = order;
  let str = "" + DemandId;
  let pad = "0000";
  let NewDemandId = pad.substring(0, pad.length - str.length) + str;

  const [isOrderCardOpen, setIsOrderCardOpen] = useState(false);

  const toggleOrderCard = () => {
    setIsOrderCardOpen(!isOrderCardOpen);
  };

  console.log(IsCreated);

  if (IsCreated == 0) {
    return (
      <div className="demand-order-card-container">
        <div>
          <div className="mb-2">Demand Id # {NewDemandId}</div>
          <div className="mb-2">Seller Name : {FirmName}</div>
          <div className="admin-demand-order-quantities">
            <div>Small : {Small}</div>
            <div>Medium : {Medium}</div>
            <div>Large : {Large}</div>
          </div>
        </div>
        <div className="mt-3 d-flex jc-space-btw">
          <Link
            to=""
            className="btn cta-btn-bg light-text f-weight-800"
            onClick={toggleOrderCard}
          >
            Create Seller Order
          </Link>
        </div>
        {isOrderCardOpen && (
          <CreateSellerOrder
            SellerId={SellerId}
            DemandId={DemandId}
            Small={Small}
            Medium={Medium}
            Large={Large}
            setIsOrderCardOpen={setIsOrderCardOpen}
          />
        )}
      </div>
    );
  }
}

export default DemandOrderCard;
