import { useContext } from "react";
import { CustomersContext } from "../../../context/admin/customers.context";
import "./admin-customers.styles.css";

const AdminCustomer = () => {
  const { customersList } = useContext(CustomersContext);

  return (
    <div>
      <div className="container-fluid m-auto">
        <h2>Customers</h2>
        <div className="table-container mb-3">
          <table className="customer-table mb-2">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Number</th>
              <th>Alt No.</th>
              <th>Address</th>
            </tr>
              {customersList.map((customer) => {
                const {
                  CustomerId,
                  FirstName,
                  PhoneNumber,
                  AltNumber,
                  BuildingName,
                  Landmark,
                  City,
                  State,
                  Country,
                  Pincode,
                } = customer;
                return (
                  <tr key={CustomerId}>
                    <td>{CustomerId}</td>
                    <td>{FirstName}</td>
                    <td>{PhoneNumber}</td>
                    <td>{AltNumber}</td>
                    <td>{`${BuildingName}, ${Landmark}, ${City}, ${State}, ${Country}, ${Pincode}`}</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomer;
