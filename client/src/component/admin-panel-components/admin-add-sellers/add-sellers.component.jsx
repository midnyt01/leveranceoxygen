import { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SellersContext } from "../../../context/admin/sellers.context";
import '../../admin-panel-components/admin-add-products/add-product.css'


const defaultFormFields = {
    FirmName:'',
    FirstName:'',
    LastName:'',
    PhoneNumber:'',
    AltNumber:'',
    Address:'',
    City: '',
    State: '',
    Password:'',
    ConfirmPassword:'',
}

const AddSellerAccount = () => {
    const [formFields,setFormFields] = useState(defaultFormFields)
    const {FirmName, FirstName, LastName, PhoneNumber, AltNumber, Password, Address, City, State, ConfirmPassword} = formFields


    const {addNewSeller} = useContext(SellersContext)

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (Password !== ConfirmPassword) {
            return alert('password doesnot match')
        }
        try {
            await addNewSeller(formFields)
            resetFormFields()
        } catch (error) {
            console.log('error on creating seller document', error)
        }
    }

    return (
        <div>
            <div className="container-fluid m-auto">
                <h2>Add Seller</h2>
                <form  className="add-psc-form" onSubmit={handleSubmit}>
                <label className="psc-label">
                        <input 
                            className="psc-input" 
                            type="text" 
                            name="FirmName"
                            placeholder="Enter seller company name" 
                            value={FirmName} 
                            onChange={handleChange} 
                        />
                        <span><FontAwesomeIcon icon="fa-solid fa-circle-check" /></span>
                    </label><br/>
                    <label className="psc-label">
                        {/* <span>First Name:</span> */}
                        <input 
                            className="psc-input" 
                            type="text" 
                            name="FirstName"
                            placeholder="Enter seller name" 
                            value={FirstName} 
                            onChange={handleChange} 
                        />
                    </label><br/>
                    <label className="psc-label">
                        {/* <span>Last Name:</span> */}
                        <input 
                            className="psc-input" 
                            type="text" 
                            name="LastName" 
                            placeholder="Enter last name"
                            value={LastName} 
                            onChange={handleChange} 
                        />
                    </label><br/>
                    <label className="psc-label">
                        {/* <span>PhoneNumber:</span> */}
                        <input 
                            className="psc-input" 
                            type="tel" 
                            name="PhoneNumber" 
                            placeholder="Enter phone number"
                            value={PhoneNumber} 
                            onChange={handleChange} 
                        />
                    </label><br/>
                    <label className="psc-label">
                        {/* <span>Alt Number:</span> */}
                        <input 
                            className="psc-input" 
                            type="tel" 
                            name="AltNumber" 
                            placeholder="Enter alternate number"
                            value={AltNumber} 
                            onChange={handleChange} />
                    </label><br/>
                    <label className="psc-label">
                        {/* <span>Address:</span> */}
                        <input 
                            className="psc-input" 
                            type="text" 
                            name="Address" 
                            placeholder="Enter street address"
                            value={Address} 
                            onChange={handleChange}/>
                    </label><br/>
                    <label className="psc-label">
                        {/* <span>City:</span> */}
                        <input 
                            className="psc-input" 
                            type="text" 
                            name="City" 
                            placeholder="Enter city"
                            value={City} onChange={handleChange}/>
                    </label><br/>
                    <label className="psc-label">
                        {/* <span>State:</span> */}
                        <input 
                            className="psc-input" 
                            type="text" 
                            name="State"
                            placeholder="Enter state" 
                            value={State} 
                            onChange={handleChange}
                        />
                    </label><br/>
                    <label className="psc-label">
                        {/* <span>Password:</span> */}
                        <input 
                            className="psc-input" 
                            type="password" 
                            name="Password" 
                            placeholder="Enter password"
                            value={Password} 
                            onChange={handleChange} 
                        />
                    </label><br/>
                    <label className="psc-label">
                        {/* <span>Confirm Password:</span> */}
                        <input 
                            className="psc-input" 
                            type="password" 
                            name="ConfirmPassword" 
                            placeholder="Enter password again"
                            value={ConfirmPassword} 
                            onChange={handleChange} 
                        />
                    </label><br/>
                    <input className="btn cta-btn-bg mt-2" type="submit" value="Create Account"/>
                </form> 
            </div>
        </div>
    )
}

export default AddSellerAccount;