import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  httpCreateSeller,
  httpCreateSellerDemandOrder,
  httpCreateSellerOrder,
  httpDeleteSeller,
  httpGetAllSellerDemandOrders,
  httpGetAllSellerReturnOrders,
  httpGetAllSellers,
  httpGetAllSellersOrders,
  httpGetSellerById,
  httpGetSellerOrdersBySellerId,
  httpGetSellerTransactionsBySellerId,
  httpUpdateSellerOrder,
  httpUpdateSellerReturnOrder,
} from "../../utils/nodejs/admin";
import { AdminNotificationsContext } from "./admin-notifications.context";
import { AdminAuthContext } from "./auth.context";
import { adminSocket, makeid } from "../socket.io";
import { ProductsContext } from "./products.context";

const updateDemandOrderArray = (sellerDemandOrders, DemandId) => {
  let newDemandArray = sellerDemandOrders;
  for (let i = 0; i < newDemandArray.length; i++) {
    if (newDemandArray[i].DemandId == DemandId) {
      newDemandArray[i].IsCreated = 1;
      break;
    }
  }
  return [...newDemandArray]
}

const findSellerName = (SellerId, sellersList) => {
  console.log(sellersList);
  for (let i = 0; i < sellersList.length; i++) {
    if (sellersList[i].SellerId === SellerId) {
      return sellersList[i].FirmName;
    }
  }
};

const addSellerToSellersList = async (sellerToAdd, sellersList) => {
  for (let i = 0; i < sellersList.length; i++) {
    if (sellerToAdd.SellerId === sellersList[i].SellerId) {
      alert("seller id already exists");
      return [...sellersList];
    } else if (sellerToAdd.PhoneNumber === sellersList[i].PhoneNumber) {
      alert("seller Phone Number already exists");
      return [...sellersList];
    }
  }
  try {
    const {
      FirmName,
      FirstName,
      LastName,
      PhoneNumber,
      AltNumber,
      Address,
      City,
      State,
      Password,
    } = sellerToAdd;
    const response = await httpCreateSeller({
      FirmName,
      FirstName,
      LastName,
      PhoneNumber,
      AltNumber,
      Address,
      City,
      State,
      Password,
    });
    if (response.ok) {
      sellerToAdd.SellerId = response.SellerId;
      return [sellerToAdd, ...sellersList];
    } else {
      //console.log('error creating seller ok not true')
    }
  } catch (error) {
    //console.log('error creating seller', error)
  }
};

const removeSellerFromSellersList = async (sellerToDelete, sellersList) => {
  for (let i = 0; i < sellersList.length; i++) {
    if (sellerToDelete.SellerId === sellersList[i].SellerId) {
      try {
        const response = await httpDeleteSeller(sellerToDelete.SellerId);
        //console.log(response)
        if (response.ok) {
          return sellersList.filter(
            (seller) => seller.SellerId !== sellerToDelete.SellerId
          );
        } else {
          //console.log('delete response ok false')
        }
      } catch (error) {
        //console.log('error in deleting seller account', error)
      }
    }
  }
  alert("seller not found");
  return;
};

const updateSellerOrderStattus = async (
  OrderToUpdate,
  newStatus,
  sellersOrders
) => {
  for (let i = 0; i < sellersOrders.length; i++) {
    if (OrderToUpdate.OrderId === sellersOrders[i].OrderId) {
      try {
        //console.log({Status: newStatus}, OrderToUpdate.OrderId)
        const response = await httpUpdateSellerOrder(
          { Status: newStatus },
          OrderToUpdate.OrderId
        );
        if (response.ok) {
          sellersOrders[i].Status = newStatus;
          console.log("sending details", {
            OrderToUpdate,
          });
          adminSocket.emit("update_seller_order_status", {
            SellerId: OrderToUpdate.SellerId,
            OrderId: OrderToUpdate.OrderId,
            Status: newStatus,
          });
          return [...sellersOrders];
        }
      } catch (error) {
        console.log("error in updating seller order", error);
      }
    }
  }
};

export const SellersContext = createContext({
  sellersList: [],
  setSellersList: () => {},
  addNewSeller: () => {},
  deleteSeller: () => {},
  sellersOrders: [],
  setSellersOrders: () => {},
  updateSellerOrder: () => {},
  currentSeller: null,
  changeCurrentSeller: () => {},
  currentSellerInfo: null,
  currentSellerOrders: [],
  currentSellerTransactions: [],
  sellerReturnOrders: [],
  updateCurrentSellerOrders: () => {},
  updateCurrentSellerTransactions: () => {},
  updateCurrentSellerInfo: () => {},
  updateSellerReturnOrderstatus: () => {},
  createSellerOrder: () => {},
  createSellerOrderFromDemand: () => {},
  sellerDemandOrders: [],
});

export const SellersProvider = ({ children }) => {
  const { isAdminLogin } = useContext(AdminAuthContext);

  const { adminNotifications, setAdminNotifications } = useContext(
    AdminNotificationsContext
  );
  const { updateAllProducts, setAllProducts } = useContext(ProductsContext);

  const [sellersList, setSellersList] = useState([]);
  const [sellersOrders, setSellersOrders] = useState([]);
  const [currentSeller, setCurrentSeller] = useState(null);
  const [currentSellerInfo, setCurrentSellerInfo] = useState(null);
  const [currentSellerOrders, setCurrentSellerOrders] = useState([]);
  const [currentSellerTransactions, setCurrentSellerTransactions] = useState(
    []
  );
  const [sellerReturnOrders, setSellerReturnOrders] = useState([]);
  const [sellerDemandOrders, setSellerDemandOrders] = useState([]);

  //getting all the sellers
  useEffect(() => {
    const getSellersAccountArray = async () => {
      if (isAdminLogin) {
        const sellersAccountArray = await httpGetAllSellers();
        setSellersList(sellersAccountArray);
      }
    };
    getSellersAccountArray();
  }, [isAdminLogin]);

  //get current seller info

  useEffect(() => {
    const getSellerInfo = async () => {
      if (isAdminLogin && currentSeller) {
        let SellerInfo = await httpGetSellerById(currentSeller);
        setCurrentSellerInfo(SellerInfo);
      }
    };
    getSellerInfo();
  }, [isAdminLogin, currentSeller]);

  //getting all the sellers orders

  useEffect(() => {
    const getSellersOrdersArray = async () => {
      if (isAdminLogin) {
        const sellersOrdersArray = await httpGetAllSellersOrders();
        setSellersOrders(sellersOrdersArray);
      }
    };
    getSellersOrdersArray();
  }, [isAdminLogin]);

  //get current seller orders

  useEffect(() => {
    let getSellerOrders = async () => {
      if (isAdminLogin && currentSeller) {
        let SellerOrders = await httpGetSellerOrdersBySellerId(currentSeller);
        setCurrentSellerOrders(SellerOrders);
      }
    };
    getSellerOrders();
  }, [isAdminLogin, currentSeller]);

  //get current seller transactions

  useEffect(() => {
    const getSellerTransactions = async () => {
      if (isAdminLogin) {
        let SellerTransactions = await httpGetSellerTransactionsBySellerId(
          currentSeller
        );
        console.log(SellerTransactions);
        setCurrentSellerTransactions(SellerTransactions);
      }
    };
    getSellerTransactions();
  }, [isAdminLogin, currentSeller]);

  useEffect(() => {
    const getSellerReturnOrders = async () => {
      if (isAdminLogin) {
        let SellerReturnOrdersArray = await httpGetAllSellerReturnOrders();
        setSellerReturnOrders(SellerReturnOrdersArray);
      }
    };
    getSellerReturnOrders();
  }, [isAdminLogin]);

  useEffect(() => {
    const getSellerDemandOrders = async () => {
      if (isAdminLogin) {
        let SellerDemandOrdersArray = await httpGetAllSellerDemandOrders();
        setSellerDemandOrders(SellerDemandOrdersArray);
      }
    };
    getSellerDemandOrders();
  }, [isAdminLogin]);

  //socket code

  useEffect(() => {
    adminSocket.on("update_seller_account_balance", async (data) => {
      if (isAdminLogin) {
        let SellerInfo = await httpGetSellerById(currentSeller);
        setCurrentSellerInfo(SellerInfo);
      }
    });

    return () => adminSocket.off("update_seller_account_balance");
  }, [currentSeller, adminSocket, isAdminLogin]);

  useEffect(() => {
    adminSocket.on("update_seller_demand", async (data) => {
      if (isAdminLogin) {
        console.log("demand received");
        if (currentSeller) {
          let SellerInfo = await httpGetSellerById(currentSeller);
          setCurrentSellerInfo(SellerInfo);
        }
        let SellerDemandOrdersArray = await httpGetAllSellerDemandOrders();
        setSellerDemandOrders(SellerDemandOrdersArray);
        let SellerName = findSellerName(data.SellerId, sellersList);
        let message = `${SellerName} requested for ${data.quantity} cylinders`;
        let messageLink = `/admin/demand-orders`;
        let messageId = makeid(5);
        console.log("adding demand message to notification");
        setAdminNotifications([
          { messageId, message, messageLink },
          ...adminNotifications,
        ]);
        console.log("added demand message");
      }
    });

    return () => adminSocket.off("update_seller_demand");
  }, [
    currentSeller,
    adminSocket,
    adminNotifications,
    sellersList,
    currentSellerInfo,
    isAdminLogin,
    sellerDemandOrders
  ]);

  useEffect(() => {
    adminSocket.on(
      "update_seller_return_orders_list",
      async ({ SellerId, orderToAdd }) => {
        if (isAdminLogin) {
          console.log("receiving refill order request");
          let SellerReturnOrdersArray = await httpGetAllSellerReturnOrders();
          setSellerReturnOrders(SellerReturnOrdersArray);
          let SellerName = findSellerName(SellerId, sellersList);
          let messageId = makeid(5);
          let messageLink = "/admin/seller-return-orders";
          let message = `${SellerName} places a return order`;
          setTimeout(() => {
            setAdminNotifications([
              { messageId, message, messageLink },
              ...adminNotifications,
            ]);
          }, 500);
        }
      }
    );

    return () => adminSocket.off("update_seller_return_orders_list");
  }, [
    adminSocket,
    sellerReturnOrders,
    adminNotifications,
    sellersList,
    isAdminLogin,
  ]);

  const addNewSeller = async (sellerToAdd) => {
    const newSellersList = await addSellerToSellersList(
      sellerToAdd,
      sellersList
    );
    setSellersList(newSellersList);
  };

  const deleteSeller = async (sellerToDelete) => {
    const newSellersList = await removeSellerFromSellersList(
      sellerToDelete,
      sellersList
    );
    setSellersList(newSellersList);
  };

  const updateSellerOrder = async (OrderToUpdate, newStatus) => {
    const newSellersOrdersList = await updateSellerOrderStattus(
      OrderToUpdate,
      newStatus,
      sellersOrders
    );
    setSellersOrders(newSellersOrdersList);
  };

  const changeCurrentSeller = (SellerId) => {
    setCurrentSeller(SellerId);
  };

  //update current seller orders on creating orders

  const updateCurrentSellerOrders = (OrderId, Payload) => {
    let date = new Date();
    let CreatedAt = date.toDateString();
    let newOrder = {
      OrderId,
      CreatedAt,
      Status: "Booked",
      Payload,
      SellerId: currentSeller,
    };
    setCurrentSellerOrders([newOrder, ...currentSellerOrders]);
    setSellersOrders([newOrder, ...sellersOrders]);
  };

  //update current seller transactions on creating orders

  const updateCurrentSellerTransactions = (TransactionId, Amount, OrderId) => {
    let date = new Date();
    let TransactionDate = date.toDateString();
    let newTransactions = {
      TransactionId,
      TransactionDate,
      Process: 0,
      SellerId: currentSeller,
      Amount,
      OrderId,
    };
    setCurrentSellerTransactions([
      newTransactions,
      ...currentSellerTransactions,
    ]);
  };

  //update current seller count and demand
  const updateCurrentSellerInfo = (Payload, Amount) => {
    let sellerInfo = currentSellerInfo;
    sellerInfo.Count = Payload.length + Number(sellerInfo.Count);
    sellerInfo.Demand = Number(sellerInfo.Demand) - Payload.length;
    sellerInfo.Balance = Number(sellerInfo.Balance) - Number(Amount);
    setCurrentSellerInfo(sellerInfo);
  };

  //upadte seller return order status

  const updateSellerReturnOrderstatus = async (
    orderDetails,
    ReturnOrderId,
    SellerId
  ) => {
    let response = await httpUpdateSellerReturnOrder(
      orderDetails,
      ReturnOrderId
    );
    if (response.success) {
      let SellerReturnOrdersArray = await httpGetAllSellerReturnOrders(); // or update seller return order manually in front end
      setSellerReturnOrders(SellerReturnOrdersArray);
      if (orderDetails.Cylinders != null) {
        updateAllProducts();
        if (Number(currentSeller) === SellerId) {
          console.log(currentSellerInfo);
          let sellerInfo = currentSellerInfo;
          sellerInfo.Count =
            Number(currentSellerInfo.Count) - orderDetails.Cylinders.length;
          setCurrentSellerInfo(sellerInfo);
        }
      }
      adminSocket.emit("update_seller_return_order_status", {
        ReturnOrderId,
        SellerId,
        Status: orderDetails.Status,
      });
    }
  };

  //Create seller order

  const createSellerOrder = async (OrderDetails) => {
    const { Cylinders, Amount } = OrderDetails;
    try {
      let response = await httpCreateSellerOrder(OrderDetails, currentSeller);
      console.log({ response });
      if (response.success) {
        updateCurrentSellerOrders(response.OrderId, Cylinders);
        updateCurrentSellerTransactions(
          response.TransactionId,
          Amount,
          response.OrderId
        );
        updateCurrentSellerInfo(Cylinders, Amount);
        updateAllProducts();
        adminSocket.emit("created_seller_order", { currentSeller });
      } else {
        console.log("order not placed", response);
      }
    } catch (error) {
      console.log("error in creating order", error);
    }
  };

  const createSellerOrderFromDemand = async (OrderDetails, DemandId) => {
    const { Cylinders, Amount } = OrderDetails;
    try {
      let response = await httpCreateSellerDemandOrder(OrderDetails, DemandId);
      console.log({ response });
      if (response.success) {
        updateCurrentSellerOrders(response.OrderId, Cylinders);
        updateCurrentSellerTransactions(
          response.TransactionId,
          Amount,
          response.OrderId
        );
        let sellerId = response.sellerId;
        // updateCurrentSellerInfo(Cylinders, Amount);
        updateAllProducts();
        let newDemandOrderArray = updateDemandOrderArray(sellerDemandOrders, DemandId);
        console.log('new updated demand order array ', newDemandOrderArray)
        setSellerDemandOrders(newDemandOrderArray);
        adminSocket.emit("created_seller_demand_order", { sellerId });
      } else {
        console.log("order not placed", response);
      }
    } catch (error) {
      console.log("error in creating order", error);
    }
  };



  const value = {
    sellersList,
    setSellersList,
    addNewSeller,
    deleteSeller,
    sellersOrders,
    setSellersOrders,
    updateSellerOrder, //order-status
    currentSeller,
    changeCurrentSeller,
    currentSellerInfo,
    currentSellerOrders,
    currentSellerTransactions,
    sellerReturnOrders,
    updateCurrentSellerOrders,
    updateCurrentSellerTransactions,
    updateCurrentSellerInfo,
    updateSellerReturnOrderstatus,
    createSellerOrder,
    createSellerOrderFromDemand,
    sellerDemandOrders,
  };

  return (
    <SellersContext.Provider value={value}>{children}</SellersContext.Provider>
  );
};
