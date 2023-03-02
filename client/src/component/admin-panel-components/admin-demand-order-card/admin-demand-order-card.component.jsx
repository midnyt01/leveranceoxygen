import { useState } from "react";
import { Link } from "react-router-dom";
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
  const { DemandId, SellerId, Quantity, FirmName, IsCreated } = order;
  let str = "" + DemandId;
  let pad = "0000";
  let NewDemandId = pad.substring(0, pad.length - str.length) + str;



  return (
    <div
      className="demand-order-card-container"
      style={{ display: IsCreated ? "none" : "inline" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>Demand Id # {NewDemandId}</div>
        <div>Quantity : {Quantity}</div>
      </div>
      <div>Seller Name : {FirmName}</div>
      <div className="mt-3 d-flex jc-space-btw">
        <Link
          to={`/admin/create-seller-demand-order/${DemandId}`}
          className="btn cta-btn-bg light-text f-weight-800"
        >
          Create Seller Order
        </Link>
      </div>
    </div>
  );
}

export default DemandOrderCard;
