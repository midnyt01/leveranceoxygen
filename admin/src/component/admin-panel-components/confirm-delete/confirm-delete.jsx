import { useContext } from "react";
import { useState } from "react";
import { ProductsContext } from "../../../context/admin/products.context";
import { SellersContext } from "../../../context/admin/sellers.context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './confirm-delete.styles.css'

const ConfirmDelete = ({
  ConfirmName,
  display,
  setDisplay,
  seller,
  product,
}) => {
  const { deleteSeller } = useContext(SellersContext);
  const { deleteProduct } = useContext(ProductsContext);
  const [isDisable, setIsDisable] = useState(true);
  const [confirmField, setConfirmField] = useState({ Confirm: "" });
  const { Confirm } = confirmField;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setConfirmField({ [name]: value });
  };

  if (Confirm === ConfirmName) {
    if (isDisable === true) {
      setIsDisable(false);
    }
  } else {
    if (isDisable === false) {
      setIsDisable(true);
    }
  }

  const handleRemove = () => {
    if (isDisable === false) {
      if (seller) {
        deleteSeller(seller);
      }
      if (product) {
        deleteProduct(product);
      }
    }
  };

  const handleOnClickDisplayChange = () => {
    setDisplay("none");
  };

  return (
    <div
      className="confirm-modal"
      style={{
        display: `${display}`,
      }}
    >
      <div className="confirm-modal-wrapper" >
        <div className="mt-3">
          Type <b>{ConfirmName.toUpperCase()}</b> to Confirm Delete
        </div>
        <input
          type="text"
          name="Confirm"
          value={Confirm}
          onChange={handleOnChange}
        />
        <br />
        <button
          disabled={isDisable}
          onClick={handleRemove}
          className="dngr confirm-del-btn"
        >
          <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
        <div
          className="confirm-modal-close"
          onClick={handleOnClickDisplayChange}
        >
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
