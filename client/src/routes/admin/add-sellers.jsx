import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createSellerDocumentFromAuth } from "../../utils/firebase/seller.utils";



const defaultFormFields = {
    sellerid:'',
    name:'',
    email:'',
    password:'',
    confirmpassword:'',
    city:''
}

const AddSellerAccount = () => {
    const [formFields,setFormFields] = useState(defaultFormFields)
    const {sellerid, name, email, password, confirmpassword, city} = formFields

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password !== confirmpassword) {
            return alert('password doesnot match')
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            console.log(user)
            await createSellerDocumentFromAuth(user, {sellerid, name, email, city,})
            resetFormFields()
        } catch (error) {
            console.log('error on creating seller document', error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Seller Id:
                    <input type="text" name="sellerid" value={sellerid} onChange={handleChange} />
                </label><br/>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={handleChange} />
                </label><br/>
                <label>
                    Email:
                    <input type="email" name="email" value={email} onChange={handleChange} />
                </label><br/>
                <label>
                    City:
                    <input type="text" name="city" value={city} onChange={handleChange}/>
                </label><br/>
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={handleChange} />
                </label><br/>
                <label>
                    Confirm Password:
                    <input type="password" name="confirmpassword" value={confirmpassword} onChange={handleChange} />
                </label><br/>
                <input type="submit" value="Create Account"/>
            </form> 
        </div>
    )
}

export default AddSellerAccount;