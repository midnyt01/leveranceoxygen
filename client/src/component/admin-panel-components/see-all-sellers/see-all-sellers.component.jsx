import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { SellersContext } from "../../../context/admin/sellers.context";
import "./see-all-sellers.style.css"
import SellerCard from "../seller-card/seller-card.components";

const SeeAllSellers = () => {

    const {sellersList} = useContext(SellersContext)
    const [sortedSellerList, setSortedSellerList] = useState([])

    useEffect(() => {
        let updatedList = sellersList.sort((a,b) => {
            return b.Demand - a.Demand
        })
        setSortedSellerList(updatedList)
    }, [sellersList])



    return (
        <div>
            <div className="container-fluid m-auto" style={{position: 'relative'}}>
            <h2>All Sellers</h2>
            {
                sortedSellerList.map((seller) => {
                    return (
                        <SellerCard key={seller.SellerId} seller={seller} />
                    )
                })
            }
            </div>
        </div>
    )
}

export default SeeAllSellers;