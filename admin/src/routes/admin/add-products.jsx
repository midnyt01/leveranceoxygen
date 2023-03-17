import { useState } from "react";
import { createProductDocument } from "../../utils/firebase/products.utils";



const defaultFormFields = {
    productid:'',
    name:'',
    pressure:'',
    weight:'',
    location:''
}


const AddProduct = () => {
    const [formFields,setFormFields] = useState(defaultFormFields)
    const {productid, name, pressure, weight, location} = formFields

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await createProductDocument(formFields)
            resetFormFields()
        } catch (error) {
            alert('error on creating product document')
        }
    }

    return (
        <div>
            <form>
                <label>
                    Product Id:
                    <input type="text" name="productid" value={productid} onChange={handleChange} />
                </label><br/>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={handleChange} />
                </label><br/>
                <label>
                    Pressure:
                    <input type="text" name="pressure" value={pressure} onChange={handleChange} />
                </label>
                <label><br/>
                    Weight:
                    <input type="text" name="weight" value={weight} onChange={handleChange} />
                </label><br/>
                <label>
                    Location:
                    <input type="text" name="location" value={location} onChange={handleChange}/>
                </label><br/>
                <input type="submit" value="Add Product" onClick={handleSubmit}/>
            </form> 
        </div>
    )
}

export default AddProduct;