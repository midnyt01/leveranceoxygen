import SearchBox from '../search-box/search-box.component';
import SellerCard from '../seller-card/seller-card.component';
import './sellers-list.styles.css'

import { SellerList } from '../../../data';

const SellersList = () => {
    return (
        <div className="sellers-list-container">
            <h2>13 Oxygen Seller Around You</h2>
            <SearchBox />
            <div className="seller-container">
                {
                    SellerList.map((seller) => {
                        return < SellerCard key={seller.id} name={seller.name} location={seller.location} />
                    })
                }          
            </div>
        </div>
    )
}


export default SellersList;