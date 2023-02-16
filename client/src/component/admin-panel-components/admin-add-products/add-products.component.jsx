import { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProductsContext } from "../../../context/admin/products.context";
import { createProductDocument } from "../../../utils/firebase/products.utils";
import { httpAddProduct } from "../../../utils/nodejs/admin";
import './add-product.css'


const defaultFormFields = {
    MFID:'',
    Volume:'',
    ProductSize:''
}


const AddProduct = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {MFID, Volume, ProductSize} = formFields

    const {addNewProduct} = useContext(ProductsContext)

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const date = new Date()
        const CreatedAt = date.toDateString()
        await addNewProduct({...formFields, CreatedAt})
        resetFormFields()
    }

    return (
        <div>
            <div className="container-fluid m-auto">
            <h2>Add Product</h2>
            <form className="add-psc-form">
                <label className="psc-label">
                    {/* <span>MFID:</span> */}
                    <input 
                        className="psc-input" 
                        type="text" 
                        name="MFID"
                        placeholder="Enter MFID" 
                        value={MFID} 
                        onChange={handleChange} 
                    />
                    <span><FontAwesomeIcon icon="fa-solid fa-circle-check" /></span>
                </label><br/>
                <label className="psc-label">
                    {/* <span>Volume:</span> */}
                    <input 
                        className="psc-input" 
                        type="text" 
                        name="Volume"
                        placeholder="Enter cylinder volume" 
                        value={Volume} 
                        onChange={handleChange} />
                </label>
                <label className="psc-label"><br/>
                    {/* <span>ProductSize:</span> */}
                    <input 
                        className="psc-input" 
                        type="text" 
                        name="ProductSize" 
                        placeholder="Enter cylinder size"
                        value={ProductSize}
                        onChange={handleChange} />
                </label><br/>
                <input className="btn cta-btn-bg mt-2" type="submit" value="Add Product" onClick={handleSubmit}/>
                {/* <input className="btn cta-btn-bg mt-2" type="submit" value="Add Multiple Products" onClick={handleSubmit}/> */}
            </form> 
            </div>
        </div>
    )
}

export default AddProduct;