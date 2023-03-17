import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SellerAuthProvider } from "./context/seller/seller-auth-context";
import { ProductCategoriesProvider } from "./context/seller/product-categories";
import { SellerOrdersProvider } from "./context/seller/seller-orders.context";
import { SellerNotificationsProvider } from "./context/seller/seller-notifications.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Seller panel */}
      <SellerAuthProvider>
        <SellerNotificationsProvider>
          <ProductCategoriesProvider>
            <SellerOrdersProvider>
                <App />
            </SellerOrdersProvider>
          </ProductCategoriesProvider>
        </SellerNotificationsProvider>
      </SellerAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
