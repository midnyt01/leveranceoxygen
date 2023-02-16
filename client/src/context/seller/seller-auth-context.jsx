import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { httpDemandCylinders, httpGetCurrentSellerInfo } from "../../utils/nodejs/seller";
import { makeid, sellerSocket } from "../socket.io";
import { SellerNotificationsContext } from "./seller-notifications.context";


const updateDemandCylinders = async (quantity, sellerInfo) => {
    let cylinders = {
        cylinders: quantity
    }
    try {
        let response = await httpDemandCylinders(cylinders)
        if (response.success === true) {
            let newSellerInfo = sellerInfo
            newSellerInfo.Demand = Number(sellerInfo.Demand) + Number(quantity)
            return newSellerInfo
        }
    } catch (error) {
        console.log("error in updating demand of seller", error)
    }

}



export const SellerAuthContext = createContext({
    isSellerLogin: null,
    setIsSellerLogin: () => {},
    sellerInfo: null,
    setSellerInfo: () => {},
    AddDemandCylinders: () => {},
})

export const SellerAuthProvider = ({children}) => {


    const [isSellerLogin, setIsSellerLogin] = useState(false)
    const [sellerInfo, setSellerInfo] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("seller")) {
            setIsSellerLogin(true)
        } else {
            setIsSellerLogin(false)
        }
    },[localStorage.getItem("seller")])

    useEffect(() => {
        const getSellerInfo = async () => {
            console.log("seller info", isSellerLogin)
            if (isSellerLogin) {
                try {
                    const sellerInfoData = await httpGetCurrentSellerInfo()
                    setSellerInfo(sellerInfoData)
                } catch (error) {
                    console.log("error in getting seller info",error)
                }
            }
        }
        getSellerInfo()
    }, [isSellerLogin])

    useEffect(() => {
        sellerSocket.on("update_seller_orders", async (data) => {
            if (isSellerLogin) {
                if (Number(data.currentSeller) == sellerInfo.SellerId ) {
                    const sellerInfoData = await httpGetCurrentSellerInfo()
                    setSellerInfo(sellerInfoData)
                }
            }
        })

        return () => sellerSocket.off("update_seller_orders")
    }, [sellerSocket, sellerInfo])

    const AddDemandCylinders = async (quantity) => {
        let newSellerInfo = await updateDemandCylinders(quantity, sellerInfo)
        setSellerInfo(newSellerInfo)
        let SellerToken = localStorage.getItem('seller')
        sellerSocket.emit("add_demand_from_seller", {quantity, SellerToken})
    }

    const value = {isSellerLogin, setIsSellerLogin, sellerInfo, setSellerInfo, AddDemandCylinders}
    return (
        <SellerAuthContext.Provider value={value}>
            {children}
        </SellerAuthContext.Provider>
    )
}