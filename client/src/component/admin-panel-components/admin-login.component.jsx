import React from 'react';  
import '../seller-panel-components/login-form.css'
import leveranceOxygenLogo from "../../assets/leverance_logo.png"
import { useState } from 'react';
import { httpLoginAdmin } from '../../utils/nodejs/admin';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AdminAuthContext } from '../../context/admin/auth.context';


const defaultFormFields = {
    PhoneNumber: '',
    Password: ''
}

const AdminLoginForm = () => {
    const navigate = useNavigate()

    const {setIsAdminLogin} = useContext(AdminAuthContext)

    const [formFields, setFormFields] = useState(defaultFormFields) 
    const {PhoneNumber, Password} = formFields

    const handleOnChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        const data = await httpLoginAdmin(formFields)
        console.log({data})
        if (data.success) {
          //save auth token and redirct to home
          localStorage.setItem('admin', data.authToken)
          setIsAdminLogin(true)
          navigate('/admin')
      } else {
        alert("Invalid Credentials")
      }
    }
    return (
        <div className='container-fluid m-auto'>
                <div className='cards-basic login-card m-auto'>
                    <div className='mt-5 card-content'>
                        <img src={leveranceOxygenLogo} alt="Leverance Global Logo" className='main-logo-lg mb-2'/>
                        <form onSubmit={handleOnSubmit}>  
                            <label className='login-label'>  
                                <input
                                    className='login-input'  
                                    name="PhoneNumber"  
                                    type="tel"  
                                    placeholder='Enter your mobile number'
                                    value={PhoneNumber}
                                    onChange={handleOnChange} />  
                            </label>  
                            <br /><br />  
                            <label className='login-label'>    
                                <input 
                                className='login-input'  
                                name="Password"  
                                type="password"
                                placeholder='Enter your password'
                                value={Password}  
                                onChange={handleOnChange} />  
                            </label><br></br>
                            <input type="submit" value="Submit" className='btn cta-btn-bg-2 mt-2'/>  
                        </form>
                        <Link to="/admin/create-account" className='mt-3' >Don't have an Account</Link>
                    </div> 
                </div>
           </div> 
    )
}


  export default AdminLoginForm;  