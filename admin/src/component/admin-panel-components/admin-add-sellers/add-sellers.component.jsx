import { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SellersContext } from "../../../context/admin/sellers.context";
import "../../admin-panel-components/admin-add-products/add-product.css";
import { CreateSellerAccountSchema } from "../../../schema/index.schema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { httpCreateSeller } from "../../../utils/nodejs/admin";

const defaultFormFields = {
  FirmName: "",
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  AltNumber: "",
  Address: "",
  City: "",
  State: "",
  Password: "",
  ConfirmPassword: "",
};

const AddSellerAccount = () => {
  const [registrationMessage, setRegistrationMessage] = useState({
    success: false,
    message: "",
  });
  const { success, message } = registrationMessage;

  const { addNewSeller } = useContext(SellersContext);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: defaultFormFields,
    validationSchema: CreateSellerAccountSchema,
    onSubmit: async (values) => {
      console.log(values);
      setRegistrationMessage({ success: false, message: "" });
      const {
        FirmName,
        FirstName,
        LastName,
        PhoneNumber,
        AltNumber,
        Address,
        City,
        State,
        Password,
      } = values;
      let sellerToAdd = {
        FirmName,
        FirstName,
        LastName,
        PhoneNumber,
        AltNumber,
        Address,
        City,
        State,
        Password,
      };
      let response = await httpCreateSeller(sellerToAdd);
      if (response.ok) {
        sellerToAdd.SellerId = response.SellerId;
        addNewSeller(sellerToAdd)
        setRegistrationMessage({
          success: true,
          message: "New seller account created successfully",
        });
        setTimeout(() => {
          setRegistrationMessage({ success: false, message: "" });
        }, 1200);
        resetForm();
      } else {
        setRegistrationMessage({
            success: false,
            message: response,
          });
      }
    },
  });

  // const handleChange = (event) => {
  //     const {name, value} = event.target
  //     setFormFields({...formFields, [name]: value})
  // }

  // const handleSubmit = async (event) => {
  //     event.preventDefault()

  //     if (Password !== ConfirmPassword) {
  //         return alert('password doesnot match')
  //     }
  //     try {
  // await addNewSeller(formFields)
  //         resetFormFields()
  //     } catch (error) {
  //         console.log('error on creating seller document', error)
  //     }
  // }

  return (
    <div>
      <div className="container-fluid m-auto">
        <h2>Add Seller</h2>
        <p
          className="login-failed"
          style={{ color: success ? "green" : "red" }}
        >
          {message}
        </p>
        <form className="add-psc-form" onSubmit={handleSubmit}>
          <label className="psc-label">
            <input
              className="psc-input"
              type="text"
              name="FirmName"
              placeholder="Enter seller company name"
              value={values.FirmName}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.FirmName && touched.FirmName && (
            <p className="form-error">{errors.FirmName}</p>
          )}
          <br />
          <label className="psc-label">
            {/* <span>First Name:</span> */}
            <input
              className="psc-input"
              type="text"
              name="FirstName"
              placeholder="Enter seller name"
              value={values.FirstName}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.FirstName && touched.FirstName && (
            <p className="form-error">{errors.FirstName}</p>
          )}
          <br />
          <label className="psc-label">
            {/* <span>Last Name:</span> */}
            <input
              className="psc-input"
              type="text"
              name="LastName"
              placeholder="Enter last name"
              value={values.LastName}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.LastName && touched.LastName && (
            <p className="form-error">{errors.LastName}</p>
          )}
          <br />
          <label className="psc-label">
            {/* <span>PhoneNumber:</span> */}
            <input
              className="psc-input"
              type="tel"
              name="PhoneNumber"
              placeholder="Enter phone number"
              value={values.PhoneNumber}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.PhoneNumber && touched.PhoneNumber && (
            <p className="form-error">{errors.PhoneNumber}</p>
          )}
          <br />
          <label className="psc-label">
            {/* <span>Alt Number:</span> */}
            <input
              className="psc-input"
              type="tel"
              name="AltNumber"
              placeholder="Enter alternate number"
              value={values.AltNumber}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.AltNumber && touched.AltNumber && (
            <p className="form-error">{errors.AltNumber}</p>
          )}
          <br />
          <label className="psc-label">
            {/* <span>Address:</span> */}
            <input
              className="psc-input"
              type="text"
              name="Address"
              placeholder="Enter street address"
              value={values.Address}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.Address && touched.Address && (
            <p className="form-error">{errors.Address}</p>
          )}
          <br />
          <label className="psc-label">
            {/* <span>City:</span> */}
            <input
              className="psc-input"
              type="text"
              name="City"
              placeholder="Enter city"
              value={values.City}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.City && touched.City && (
            <p className="form-error">{errors.City}</p>
          )}
          <br />
          <label className="psc-label">
            {/* <span>State:</span> */}
            <input
              className="psc-input"
              type="text"
              name="State"
              placeholder="Enter state"
              value={values.State}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.State && touched.State && (
            <p className="form-error">{errors.State}</p>
          )}
          <br />
          <label className="psc-label">
            {/* <span>Password:</span> */}
            <input
              className="psc-input"
              type="password"
              name="Password"
              placeholder="Enter password"
              value={values.Password}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.Password && touched.Password && (
            <p className="form-error">{errors.Password}</p>
          )}
          <br />
          <label className="psc-label">
            {/* <span>Confirm Password:</span> */}
            <input
              className="psc-input"
              type="password"
              name="ConfirmPassword"
              placeholder="Enter password again"
              value={values.ConfirmPassword}
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur}
            />
          </label>
          {errors.ConfirmPassword && touched.ConfirmPassword && (
            <p className="form-error">{errors.ConfirmPassword}</p>
          )}
          <br />
          <input
            className="btn cta-btn-bg mt-2"
            type="submit"
            value="Create Account"
          />
        </form>
      </div>
    </div>
  );
};

export default AddSellerAccount;
