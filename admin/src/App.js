import { Routes, Route } from "react-router-dom";

// Admin Panel
import AdminPanel from "./routes/admin/admin-panel.component";
import Adminlogin from "./routes/admin/admin-login/admin-login";
import AdminSellers from "./routes/admin/admin-sellers/admin-seller.component";
import AdminProducts from "./routes/admin/admin-products/admin-products.component";
import AdminInventory from "./routes/admin/admin-inventory/admin-inventory.component";
import AdminOrderPage from "./routes/admin/admin-orders/admin-order.component";
import AdminCustomerPage from "./routes/admin/admin-customers/admin-customer-page.component";
import BugreportPage from "./routes/admin/admin-panel-management/bug-reports";
import EnquiryPage from "./routes/admin/admin-panel-management/enquiry";
import SiteSettingPage from "./routes/admin/admin-panel-management/site-settings";
import BannerPage from "./routes/admin/admin-banner/banner-page";
// CSS
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// Images and Logo
import LeveranceOxygenLogo from "./assets/leverance_logo.png";
import AdminCreateAccount from "./routes/admin/admin-create-account/admin-create-account.component";
import { ProtectedRoute } from "./context/admin/protected-route";
// import SellerCreateOrder from "./routes/seller/seller-create-order/seller-create-order.component";
import AdminSellerAccountLists from "./routes/admin/admin-seller-account-list";
import AdminCurrentSellerAccount from "./routes/admin/admin-current-seller-account/admin-current-seller-account";
import AdminSellerReturnOrders from "./routes/admin/admin-seller-return-orders/admin-seller-return-orders";
import DemandOrders from "./routes/admin/admin-demand-orders/admin-demand-orders.component";

library.add(fas);

function App() {
  return (
    <Routes>
      {/* Common */}
      <Route path="/mainlogo" element={<LeveranceOxygenLogo />} />

      {/* Admin Panel */}
      <Route path="/admin-login" element={<Adminlogin />} />
      <Route path="/create-account" element={<AdminCreateAccount />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-banner"
        element={
          <ProtectedRoute>
            <BannerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-seller"
        element={
          <ProtectedRoute>
            <AdminSellers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/all-sellers/*"
        element={
          <ProtectedRoute>
            <AdminSellerAccountLists />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sellers/*"
        element={
          <ProtectedRoute>
            <AdminCurrentSellerAccount />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-inventory"
        element={
          <ProtectedRoute>
            <AdminInventory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-orders"
        element={
          <ProtectedRoute>
            <AdminOrderPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demand-orders"
        element={
          <ProtectedRoute>
            <DemandOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller-return-orders"
        element={
          <ProtectedRoute>
            <AdminSellerReturnOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-customer"
        element={
          <ProtectedRoute>
            <AdminCustomerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <BugreportPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/enquiries"
        element={
          <ProtectedRoute>
            <EnquiryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/site-settings"
        element={
          <ProtectedRoute>
            <SiteSettingPage />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/create-seller-order"
        element={
          <ProtectedRoute>
            <CreateSellerOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-seller-demand-order/*"
        element={
          <ProtectedRoute>
            <CreateSellerDemandOrder />
          </ProtectedRoute>
        }
      /> */}


      {/* Seller Panel */}
      {/* <Route path="/seller/seller-login" element={<Sellerlogin />} />
      <Route
        path="/seller"
        element={
          <SellerProtectedRoute>
            <SellerMyAccount />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/seller/seller-analytics"
        element={
          <SellerProtectedRoute>
            <SellerAnalytics />
          </SellerProtectedRoute>
        }
      />

      <Route
        path="/seller/confirm-orders"
        element={
          <SellerProtectedRoute>
            <SellerConfirmationOrders />
          </SellerProtectedRoute>
        }
      />
      <Route
        path="/seller/return-orders"
        element={
          <SellerProtectedRoute>
            <SellerPanel />
          </SellerProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

export default App;
