import { useContext, useState } from "react";
import { ProductsContext } from "../../../context/admin/products.context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../see-all-products/product-list.css'
import ConfirmDelete from "../confirm-delete/confirm-delete";


const ProductCard = ({product}) => {
    const {MFID, Volume, ProductSize, WithSeller, FirmName} = product

    const [display, setDisplay] = useState('none')


    const handleOnClick = () => {
        setDisplay('block')
    }

    const handleEdit = () => {

    }
    return (
        <div className='psc-list mb-2' style={{backgroundColor: (WithSeller === 1) ? '#c3f3c3': 'lightyellow'}}>
            <p>MFID: {MFID}</p>
            <p>Volume: {Volume} Liters</p>
            <p>Size: {ProductSize}</p>
            {
                (WithSeller === 1) ? (
                    <p>Current location: Leverance Oxygen</p>
                ) : (
                    <p>Current location: {FirmName}</p>
                )
            }
            <button className="btn transparent-bg" onClick={handleOnClick}><span className='dngr'><FontAwesomeIcon icon="fa-solid fa-trash"/></span></button>
            <button className="btn transparent-bg" onClick={handleEdit}><span className='cta-link-2'><FontAwesomeIcon icon="fa-solid fa-pen-to-square"/></span></button>
            <ConfirmDelete ConfirmName={ProductSize} display={display} setDisplay={setDisplay} product={product}/>
        </div>
    )
}

export default ProductCard;