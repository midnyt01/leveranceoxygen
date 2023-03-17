import React from "react";
import "./admin-create-account-form.styles.css";
import leveranceOxygenLogo from "../../../assets/leverance_logo.png";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { httpCreateAdmin } from "../../../utils/nodejs/admin";
import { useContext } from "react";
import { AdminAuthContext } from "../../../context/admin/auth.context";
import { useFormik } from 'formik';
import { RegistrationSchema } from "../../../schema/index.schema";

const defaultFormFields = {
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  Password: "",
  Confirm_Password: "",
};

const AdminCreateAccountForm = () => {
  const navigate = useNavigate();

  const { isAdminLogin, setIsAdminLogin } = useContext(AdminAuthContext);

  const [registrationMessage, setRegistrationMessage] = useState({success: false, message: ""})
  const {success, message} = registrationMessage;

  
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: defaultFormFields,
    validationSchema: RegistrationSchema,
    onSubmit : async (values) => {
      const {FirstName, LastName, PhoneNumber, Password} = values;
        console.log(values)
        setRegistrationMessage({success: false, message: ""});
        const data = await httpCreateAdmin({FirstName, LastName, PhoneNumber, Password})
        console.log({data})
        if (data.success) {
        //save auth token and redirct to home
            localStorage.setItem('admin', data.authToken)
            setRegistrationMessage({success: true, message: "New admin account created successfully"})
            setTimeout(() => {
              navigate('/')
            }, 700);
        } else {
            setRegistrationMessage({success: false, message: data})
        }
    }
})

const handleGoBack = () => {
  navigate('/')
}


  // const handleOnChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormFields({ ...formFields, [name]: value });
  // };

  // const handleOnSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = await httpCreateAdmin(formFields);
  //   console.log({ data });
  //   if (data.success) {
  //     //save auth token and redirct to home
  //     localStorage.setItem("admin", data.authToken);
  //     setIsAdminLogin(true);
  //     navigate("/");
  //   } else {
  //     alert("Invalid Credentials");
  //   }
  // };

  return (
    <div className="container-fluid m-auto">
      <div className="cards-basic login-card m-auto">
        <div className="mt-5 card-content">
          <p className='login-failed' style={{color: success ? 'green' : 'red'}} >{message}</p>
          <h3>Create New Admin Account</h3>
          <form onSubmit={handleSubmit}>
            <label className="login-label">
              <input
                className="login-input"
                name="FirstName"
                type="text"
                placeholder="Your First Name"
                value={values.FirstName}
                onChange={handleChange}
                autoComplete='off'
                onBlur={handleBlur}
              />
            </label>
            {errors.FirstName && touched.FirstName && <p className="form-error">{errors.FirstName}</p>}
            <label className="login-label">
              <input
                className="login-input"
                name="LastName"
                type="text"
                placeholder="Your Last Name"
                value={values.LastName}
                onChange={handleChange}
                autoComplete='off'
                onBlur={handleBlur}
              />
            </label>
            {errors.LastName && touched.LastName && <p className="form-error">{errors.LastName}</p>}
            <label className="login-label">
              <input
                className="login-input"
                name="PhoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={values.PhoneNumber}
                onChange={handleChange}
                autoComplete='off'
                onBlur={handleBlur}
              />
            </label>
            {errors.PhoneNumber && touched.PhoneNumber && <p className="form-error">{errors.PhoneNumber}</p>}
            <label className="login-label">
              <input
                className="login-input"
                name="Password"
                type="password"
                placeholder="Enter your password"
                value={values.Password}
                onChange={handleChange}
                autoComplete='off'
                onBlur={handleBlur}
              />
            </label>
            {errors.Password && touched.Password && <p className="form-error">{errors.Password}</p>}
            <label className="login-label">
              <input
                className="login-input"
                name="Confirm_Password"
                type="password"
                placeholder="Enter confirm password"
                value={values.Confirm_Password}
                onChange={handleChange}
                autoComplete='off'
                onBlur={handleBlur}
              />
            </label>
            {errors.Confirm_Password && touched.Confirm_Password && <p className="form-error">{errors.Confirm_Password}</p>}
            <input
              type="submit"
              value="Submit"
              className="btn cta-btn-bg-2 mt-2"
            />
          </form>
          <div style={{margin: '5px auto', cursor: 'pointer', fontSize: '17px'}} onClick={handleGoBack} >Go Back</div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateAccountForm;
