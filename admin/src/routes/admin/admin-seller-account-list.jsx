import Topbar from "../../component/admin-panel-components/admin-topbar/topbar.component";
import AdminSellerAccount from "../../component/admin-panel-components/admin-seller-myaccount/admin-seller-myaccount.component";
import SeeAllSellers from "../../component/admin-panel-components/see-all-sellers/see-all-sellers.component";
import { Route, Routes } from "react-router-dom";

const AdminSellerAccountLists = () => {
  return (
    <div>
        
      <Routes>
        <Route path="/" element={<Topbar />}>
          <Route index element={<SeeAllSellers />} />
          <Route path="/:SellerId" element={<AdminSellerAccount />} />
        </Route>
      </Routes>
      </div>
  );
};
  
  export default AdminSellerAccountLists;