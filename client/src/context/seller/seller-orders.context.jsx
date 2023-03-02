import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  httpAddSellerBalance,
  httpCreateSellerOrder,
  httpCreateSellerReturnOrder,
  httpGetAllSellerOrders,
  httpGetAllSellerTransactions,
  httpGetCurrentSellerInfo,
  httpGetSellerReturnOrders,
} from "../../utils/nodejs/seller";
import { SellerAuthContext } from "./seller-auth-context";
import { makeid, sellerSocket } from "../socket.io";
import { SellerNotificationsContext } from "./seller-notifications.context";


const addSellerOrder = async (orderToAdd, sellerOrders) => {
  const response = await httpCreateSellerOrder(orderToAdd);
  if (response.ok) {
    let OrderId = response.OrderId;
    orderToAdd.OrderId = OrderId;
    sellerSocket.emit("create_seller_order", orderToAdd);
    return [orderToAdd, ...sellerOrders];
  } else {
    console.log("response for creating seller order is not ok");
  }
};

const addSellerOrderToList = async (orderToAdd, sellerReturnOrders) => {
  const response = await httpCreateSellerReturnOrder()
  if (response.success) {
    orderToAdd.ReturnOrderId = response.ReturnOrderId;
    let SellerToken = localStorage.getItem('seller')
    sellerSocket.emit("add_seller_return_order", {SellerToken, orderToAdd})
    return [orderToAdd, ...sellerReturnOrders]
  } else {
    console.log('error in creating seller return order')
  }
}

//adds balance to seller account and returns new seller info and transaction list
const addBalanceToSellerAccount = async (transactionDetail, sellerTransactions, sellerInfo) => {
  try {
    let response = await httpAddSellerBalance(transactionDetail)
    if (response.success === true) {
      let newSellerInfo = sellerInfo
      newSellerInfo.Balance = String(Number(sellerInfo.Balance) + Number(transactionDetail.Amount))
      transactionDetail.TransactionId = response.TransactionId;
      return [newSellerInfo, [transactionDetail, ... sellerTransactions]]
    }
  } catch (error) {
    console.log("error in adding balance seller orders context", error)
  }
}

export const SellerOrdersContext = createContext({
  sellerOrders: null,
  setSellerOrders: () => {},
  createSellerOrder: () => {},
  sellerTransactions: null,
  setSellerTransactions: () => {},
  sellerReturnOrders: null,
  addSellerBalance: () => {},
  addToSellerReturnOrder: () => {},
});

export const SellerOrdersProvider = ({ children }) => {

  const { isSellerLogin } = useContext(SellerAuthContext);
  const {sellerNotifications, setSellerNotifications} = useContext(SellerNotificationsContext)

  const [sellerOrders, setSellerOrders] = useState([]);
  const [sellerTransactions, setSellerTransactions] = useState([]);
  const [sellerReturnOrders, setSellerReturnOrders] = useState([]);

  const {sellerInfo, setSellerInfo} = useContext(SellerAuthContext)

  useEffect(() => {
    const getSellerOrdersArray = async () => {
      console.log("getting all orders");
      if (isSellerLogin) {
        try {
          const sellerOrdersArray = await httpGetAllSellerOrders();
          setSellerOrders(sellerOrdersArray);
        } catch (error) {
          console.log("error getting seller orders", error);
        }
      }
    };
    getSellerOrdersArray();
  }, [isSellerLogin]);

  useEffect(() => {
    const getSellerTransactionArray = async () => {
      if (isSellerLogin) {
        try {
          const sellerTransactionArray = await httpGetAllSellerTransactions();
          setSellerTransactions(sellerTransactionArray);
        } catch (error) {
          console.log("error in getting seller transactions", error);
        }
      }
    };
    getSellerTransactionArray();
  }, [isSellerLogin]);

  useEffect(() => {
    const getSellerReturnOrderArray = async () => {
      if (isSellerLogin) {
        try {
          let sellerReturnOrderArray = await httpGetSellerReturnOrders();
          setSellerReturnOrders(sellerReturnOrderArray);
        } catch (error) {
          error("error getting seller return orders", error);
        }
      }
    };
    getSellerReturnOrderArray()
  }, [isSellerLogin]);

  //socket code

  useEffect(() => {
    sellerSocket.on("update_seller_order_status", (data) => {
      if(isSellerLogin) {
        for (let i = 0; i < sellerOrders.length; i++) {
          if (sellerOrders[i].OrderId === data.OrderId) {
            sellerOrders[i].Status = data.Status;
            setSellerOrders([...sellerOrders]);
          }
        }
      }
    });
  }, [sellerSocket, sellerOrders]);

  useEffect(() => {
    if (sellerInfo) {
      sellerSocket.on("update_seller_orders", async (data) => {
        if (isSellerLogin) {
          console.log('receiving created seller order')
          if (Number(data.currentSeller) == sellerInfo.SellerId ) {
            const sellerTransactionArray = await httpGetAllSellerTransactions();
            setSellerTransactions(sellerTransactionArray);
            const sellerOrdersArray = await httpGetAllSellerOrders();
            setSellerOrders(sellerOrdersArray);
            let message = 'Leverance Oxygen has created your order';
            let messageLink = '/seller'
            let messageId = makeid(5)
            setSellerNotifications([{messageId, message, messageLink}, ...sellerNotifications])
          }
        }
    })
    }

    return () => sellerSocket.off("update_seller_orders")
}, [sellerSocket, sellerInfo, sellerNotifications])

useEffect(() => {
  if (sellerInfo) {
    sellerSocket.on("update_seller_demand_orders", async (data) => {
      if (isSellerLogin) {
        console.log('receiving created seller order')
        if (Number(data.sellerId) == sellerInfo.SellerId ) {
          const sellerTransactionArray = await httpGetAllSellerTransactions();
          setSellerTransactions(sellerTransactionArray);
          const sellerOrdersArray = await httpGetAllSellerOrders();
          setSellerOrders(sellerOrdersArray);
          let message = 'Leverance Oxygen has created your order';
          let messageLink = '/seller'
          let messageId = makeid(5)
          setSellerNotifications([{messageId, message, messageLink}, ...sellerNotifications])
        }
      }
  })
  }

  return () => sellerSocket.off("update_seller_orders")
}, [sellerSocket, sellerInfo, sellerNotifications])

useEffect(() => {
  sellerSocket.on("update_order_status", (data) => {
    if (isSellerLogin) {
      const {SellerId, OrderId, Status} = data
      let newOrderArray = sellerOrders;
      if (Number(SellerId) == sellerInfo.SellerId ) {
        for (let i = 0; i < newOrderArray.length; i++) {
          if (newOrderArray[i].OrderId == OrderId) {
            console.log(`orderid ${OrderId} matched`)
            newOrderArray[i].Status = Status;
            if (Status == "Delivered") {
              let date = new Date();
              let DeliveredAt = date.toDateString()
              newOrderArray[i].DeliveredAt = DeliveredAt;
            }
            break;
          }
        }
        setSellerOrders([...newOrderArray])
        let message = `Your order ${OrderId} has been ${Status}`;
        let messageLink = '/seller'
        let messageId = makeid(5)
        setSellerNotifications([{messageId, message, messageLink}, ...sellerNotifications])
    }
    }
  })
  return () => sellerSocket.off("update_order_status")
}, [sellerSocket, sellerInfo, sellerOrders])

useEffect(() => {
  sellerSocket.on("update_return_order_status", async (data) => {
    if (isSellerLogin) {
      const {SellerId, ReturnOrderId, Status} = data
      let newReturnOrderArray = sellerReturnOrders
      if (Number(SellerId) == sellerInfo.SellerId ) {
        if (Status === "Received") {
          const sellerInfoData = await httpGetCurrentSellerInfo()
          setSellerInfo(sellerInfoData)
        }
        for (let i = 0; i < newReturnOrderArray.length; i++) {
          if (newReturnOrderArray[i].ReturnOrderId == ReturnOrderId) {
            newReturnOrderArray[i].Status = Status;
            if (Status === "Received") {
              newReturnOrderArray[i].IsCompleted = 1;
            }
            break;
          }
        }
        setSellerReturnOrders([...newReturnOrderArray])
        let message = `Your return order ${ReturnOrderId} has been ${Status}`;
        let messageLink = '/seller/return-orders'
        let messageId = makeid(5)
        setSellerNotifications([{messageId, message, messageLink}, ...sellerNotifications])
      }
    }
  })
  return () => sellerSocket.off("update_return_order_status")
}, [sellerSocket, sellerInfo, sellerReturnOrders])



  const addSellerBalance = async (Amount) => {
    let date = new Date()
    let transactionDetail = {
      Process : 1,
      Amount,
      Method: 'UPI',
      TransactionDate: date.toDateString()
    }
    try {
      let updateSellerDetails = await addBalanceToSellerAccount(transactionDetail, sellerTransactions, sellerInfo)
      setSellerInfo(updateSellerDetails[0])
      setSellerTransactions(updateSellerDetails[1])
      //updating admin by sellerSocket io
      sellerSocket.emit("add_balance_seller_acount", {message: "seller added balance"});
    } catch (error) {
      console.log('error in updating seller info and balance', error)
    }
  }

  const createSellerOrder = async (quantity) => {
    let orderToAdd = {
      Manufacturer: "leverance",
      Status: "Booked",
      Payment: "UPI",
      CreatedAt: new Date(),
      Payload: [
        {
          ProductId: 1,
          Quantity: quantity.Large,
        },
        {
          ProductId: 2,
          Quantity: quantity.Medium,
        },
        {
          ProductId: 3,
          Quantity: quantity.Small,
        },
      ],
    };
    console.log(orderToAdd);
    const newSellerOrdersArray = await addSellerOrder(orderToAdd, sellerOrders);
    setSellerOrders(newSellerOrdersArray);
  };

  const addToSellerReturnOrder = async (orderDetails) => {    
    let date = new Date()
    let CreatedAt = date.toDateString()
    let orderToAdd = {CreatedAt, ...orderDetails}
    let newReturnOrdersArray = await addSellerOrderToList(orderToAdd, sellerReturnOrders);
    setSellerReturnOrders(newReturnOrdersArray)
  }

  const value = {
    sellerOrders,
    setSellerOrders,
    createSellerOrder,
    sellerTransactions,
    setSellerTransactions,
    sellerReturnOrders,
    addSellerBalance,
    addToSellerReturnOrder,
  };

  return (
    <SellerOrdersContext.Provider value={value}>
      {children}
    </SellerOrdersContext.Provider>
  );
};
