import React from 'react';  
import './admin-login-form.css'
import leveranceOxygenLogo from "../../assets/leverance_logo.png"
import { useState } from 'react';
import { httpLoginAdmin } from '../../utils/nodejs/admin';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AdminAuthContext } from '../../context/admin/auth.context';
import { useFormik } from 'formik';
import { LoginSchema } from '../../schema/index.schema';


const defaultFormFields = {
    PhoneNumber: '',
    Password: ''
}

const AdminLoginForm = () => {
    const navigate = useNavigate()

    const {setIsAdminLogin} = useContext(AdminAuthContext)

    const [loginFailed, setLoginFailed] = useState({message:""})
    const {message} = loginFailed

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: defaultFormFields,
        validationSchema: LoginSchema,
        onSubmit : async (values) => {
            console.log(values)
            setLoginFailed({message: ""});
            const data = await httpLoginAdmin(values)
            console.log({data})
            if (data.success) {
            //save auth token and redirct to home
                localStorage.setItem('admin', data.authToken)
                setIsAdminLogin(true)
                navigate('/')
            } else {
                setLoginFailed({message: data})
            }
        }
    })


    // const [formFields, setFormFields] = useState(defaultFormFields) 
    // const {PhoneNumber, Password} = formFields

    // const handleOnChange = (event) => {
    //     const {name, value} = event.target;
    //     setFormFields({...formFields, [name]: value})
    // }

    // const handleOnSubmit = async (event) => {
    //     event.preventDefault()
    //     const data = await httpLoginAdmin(formFields)
    //     console.log({data})
    //     if (data.success) {
    //       //save auth token and redirct to home
    //       localStorage.setItem('admin', data.authToken)
    //       setIsAdminLogin(true)
    //       navigate('/')
    //   } else {
    //     alert("Invalid Credentials")
    //   }
    // }
    return (
        <div className='container-fluid m-auto'>
                <div className='cards-basic login-card m-auto'>
                    <div className='mt-5 card-content'>
                        <img src={leveranceOxygenLogo} alt="Leverance Global Logo" className='main-logo-lg mb-2'/>
                        <p className='login-failed' >{message}</p>
                        <form onSubmit={handleSubmit}> 
                            <label className='login-label'>  
                                <input
                                    className='login-input'  
                                    name="PhoneNumber"  
                                    type="tel"
                                    placeholder='Enter your mobile number'
                                    value={values.PhoneNumber}
                                    autoComplete='off'
                                    onBlur={handleBlur}
                                    onChange={handleChange} />  
                            </label>
                            {errors.PhoneNumber && touched.PhoneNumber && <p className="form-error">{errors.PhoneNumber}</p>}
                            <label className='login-label'>    
                                <input 
                                className='login-input'  
                                name="Password"  
                                type="password"
                                autoComplete='off'
                                placeholder='Enter your password'
                                value={values.Password}
                                onBlur={handleBlur}
                                onChange={handleChange} />   
                            </label>
                            {errors.Password && touched.Password && <p className="form-error">{errors.Password}</p>}
                            <input type="submit" value="Submit" className='btn cta-btn-bg-2 mt-2'/>  
                        </form>
                    </div> 
                </div>
           </div> 
    )
}


  export default AdminLoginForm;  