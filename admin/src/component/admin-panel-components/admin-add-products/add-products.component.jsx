import { useContext, useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProductsContext } from "../../../context/admin/products.context";
import { createProductDocument } from "../../../utils/firebase/products.utils";
import { httpAddProduct } from "../../../utils/nodejs/admin";
import './add-product.css'


const defaultFormFields = {
    MFID:'',
    Volume:12,
    ProductSize:'small'
}


const AddProduct = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const {MFID, Volume, ProductSize} = formFields

    const [message, setMessage] = useState({success: true, message: ""});
    

    const {addNewProduct} = useContext(ProductsContext)

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const handleSizeChagne = (event) => {
        const {name, value} = event.target
        if (value == 'small') {
            console.log({...formFields, [name]: value, Volume: 12}, 'changing small');
            setFormFields({...formFields, [name]: value, Volume: 12})
        } else if (value == 'medium') {
            console.log({...formFields, [name]: value, Volume: 14}, 'changing medium');
            setFormFields({...formFields, [name]: value, Volume: 14})
        } else if (value == 'large') {
            console.log({...formFields, [name]: value, Volume: 16}, 'changing large');
            setFormFields({...formFields, [name]: value, Volume: 16})
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setMessage({success: false, message: ""});
        const date = new Date()
        const CreatedAt = date.toDateString()
        let response = await addNewProduct({...formFields, CreatedAt})
        console.log(response)
        if (response.success) {
        setMessage({success: true, message: "product added successfully"});
        setTimeout(() => {
        setMessage({success: false, message: ""});
        }, 1500);
        resetFormFields()
        } else {
        setMessage({success: false, message: response.message});
        }
    }

    return (
        <div>
            <div className="container-fluid m-auto">
            <h2>Add Product</h2>
            <form className="add-psc-form">
                <p style={{margin: '2px 0', color: message.success ? 'green' : 'red'}}>{message.message}</p>
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
                </label><br/>
                <div className="product-size-container">
                <label for="ProductSize" >Cylinder Size:</label>
                    <select className="product-size-item" name="ProductSize" onChange={handleSizeChagne}>
                        <option value="small" >Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                <div className="product-volume-container" >Volume: <span className="product-volume" >{Volume}</span></div>
                <input className="btn cta-btn-bg mt-2" type="submit" value="Add Product" onClick={handleSubmit}/>
                {/* <input className="btn cta-btn-bg mt-2" type="submit" value="Add Multiple Products" onClick={handleSubmit}/> */}
            </form> 
            </div>
        </div>
    )
}

export default AddProduct;