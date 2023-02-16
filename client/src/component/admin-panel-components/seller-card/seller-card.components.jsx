import { useState } from "react";
import ConfirmDelete from "../confirm-delete/confirm-delete";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../see-all-products/product-list.css'
import { Link } from "react-router-dom";

const SellerCard = ({seller}) => {
    const {SellerId,FirmName, PhoneNumber, Address, City, State} = seller

    const [display, setDisplay] = useState('none')


    const handleOnClick = () => {
        setDisplay('block')
    }

    return (
        <div className="psc-list mb-2" >
            <Link to={`/all-sellers/${SellerId}`}>
            <div className="mt-1 mb-1">Name: {FirmName}</div>
            <div className="mt-1 mb-1">Phone Number: {PhoneNumber}</div>
            <div className="mt-1 mb-1" >Location: {`${Address}, ${City}, ${State}`}</div>
            </Link>
            <button className="mt-1 mb-1 border-none" onClick={handleOnClick}><span className='dngr'><FontAwesomeIcon icon="fa-solid fa-trash"/></span></button>
            <ConfirmDelete ConfirmName={PhoneNumber} display={display} setDisplay={setDisplay} seller={seller}/>
        </div>
    )
}

export default SellerCard;