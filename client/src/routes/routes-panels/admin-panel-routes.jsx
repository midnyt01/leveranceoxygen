import { Route, Routes } from "react-router-dom";
import Topbar from "../../component/customer-panel-components/topbar/topbar.component";
import { ProtectedRoute } from "../../context/admin/protected-route";
import BannerPage from "../admin/admin-banner/banner-page";
import AdminCreateAccount from "../admin/admin-create-account/admin-create-account.component";
import AdminCustomerPage from "../admin/admin-customers/admin-customer-page.component";
import AdminInventory from "../admin/admin-inventory/admin-inventory.component";
import Adminlogin from "../admin/admin-login/admin-login";
import AdminOrderPage from "../admin/admin-orders/admin-order.component";
import BugreportPage from "../admin/admin-panel-management/bug-reports";
import EnquiryPage from "../admin/admin-panel-management/enquiry";
import SiteSettingPage from "../admin/admin-panel-management/site-settings";
import AdminPanel from "../admin/admin-panel.component";
import AdminProducts from "../admin/admin-products/admin-products.component";
import AdminSellerMyAccount from "../admin/admin-seller-myaccount";
import AdminSellers from "../admin/admin-sellers/admin-seller.component";

const AdminPanelRoutes = () => {
  return (
    <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path="admin-login" element={<Adminlogin />} />
        <Route path="create-account" element={<AdminCreateAccount />} />
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
              <AdminSellerMyAccount />
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
    </Routes>
  );
};

export default AdminPanelRoutes;
