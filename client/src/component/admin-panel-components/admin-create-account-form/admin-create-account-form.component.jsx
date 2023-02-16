import React from "react";
import "./admin-create-account-form.styles.css";
import leveranceOxygenLogo from "../../../assets/leverance_logo.png";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { httpCreateAdmin } from "../../../utils/nodejs/admin";
import { useContext } from "react";
import { AdminAuthContext } from "../../../context/admin/auth.context";

const defaultFormFields = {
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  Password: "",
};

const AdminCreateAccountForm = () => {
  const navigate = useNavigate();

  const { isAdminLogin, setIsAdminLogin } = useContext(AdminAuthContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { FirstName, LastName, PhoneNumber, Password } = formFields;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const data = await httpCreateAdmin(formFields);
    console.log({ data });
    if (data.success) {
      //save auth token and redirct to home
      localStorage.setItem("admin", data.authToken);
      setIsAdminLogin(true);
      navigate("/admin");
    } else {
      alert("Invalid Credentials");
    }
  };

  if (isAdminLogin) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="container-fluid m-auto">
      <div className="cards-basic login-card m-auto">
        <div className="mt-5 card-content">
          <img
            src={leveranceOxygenLogo}
            alt="Leverance Global Logo"
            className="main-logo-lg mb-2"
          />
          <form onSubmit={handleOnSubmit}>
            <label className="login-label">
              <input
                className="login-input"
                name="FirstName"
                type="text"
                placeholder="Your First Name"
                value={FirstName}
                onChange={handleOnChange}
              />
            </label>
            <br />
            <br />
            <label className="login-label">
              <input
                className="login-input"
                name="LastName"
                type="text"
                placeholder="Your Last Name"
                value={LastName}
                onChange={handleOnChange}
              />
            </label>
            <br />
            <br />
            <label className="login-label">
              <input
                className="login-input"
                name="PhoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={PhoneNumber}
                onChange={handleOnChange}
              />
            </label>
            <br />
            <br />
            <label className="login-label">
              <input
                className="login-input"
                name="Password"
                type="text"
                placeholder="Enter your password"
                value={Password}
                onChange={handleOnChange}
              />
            </label>
            <br></br>
            <input
              type="submit"
              value="Submit"
              className="btn cta-btn-bg-2 mt-2"
            />
          </form>
          <Link to="/admin/admin-login">Already have an account</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateAccountForm;
