const SellerOrderCard = ({ order }) => {
  const { CreatedAt, ReceivedAt, ReturnOrderId, Status } = order;
  let str = "" + ReturnOrderId;
  let pad = "0000";
  let NewReturnOrderId = pad.substring(0, pad.length - str.length) + str;

  return (
    <div className="seller-cards-basic" key={NewReturnOrderId}>
      <p style={{ margin: "0 0 2px 0" }}>
        <b>{`Return Order ID #${NewReturnOrderId}`}</b>
      </p>
      <p style={{ textAlign: "right", margin: "0px" }}>
        Delivery status: {Status}
      </p>
      <div className="date-wrapper d-flex jc-space-btw">
        <span className="order-created-date">{CreatedAt}</span>
        <span className="delivered-date">{ReceivedAt}</span>
      </div>
    </div>
  );
};

export default SellerOrderCard;
