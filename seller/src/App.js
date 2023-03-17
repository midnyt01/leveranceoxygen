import { Routes, Route } from "react-router-dom";
// Seller Panel
import SellerPanel from "./routes/seller/seller-panel.component";
import Sellerlogin from "./routes/seller/seller-login/seller-login";
import SellerAnalytics from "./routes/seller/seller-analytics/seller-analytics.component";
import SellerMyAccount from "./routes/seller/seller-myaccount/seller-myaccount.component";

// CSS
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import SellerProtectedRoute from "./context/seller/seller-protected-route";

import SellerConfirmationOrders from "./routes/seller/seller-confirmation-orders/seller-confirmation-ordres.component";

library.add(fas);

function App() {
  return (
    <Routes>
      {/* Seller Panel */}
      <Route path="/seller-login" element={<Sellerlogin />} />
      <Route
        path="/"
        element={
          <SellerProtectedRoute>
            <SellerMyAccount />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/seller-analytics"
        element={
          <SellerProtectedRoute>
            <SellerAnalytics />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/confirm-orders"
        element={
          <SellerProtectedRoute>
            <SellerConfirmationOrders />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/return-orders"
        element={
          <SellerProtectedRoute>
            <SellerPanel />
          </SellerProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
