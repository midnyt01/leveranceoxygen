import { Route, Routes } from "react-router-dom"
import AdminSellerAccount from "../../../component/admin-panel-components/admin-seller-myaccount/admin-seller-myaccount.component"
import Topbar from "../../../component/admin-panel-components/admin-topbar/topbar.component"

const AdminCurrentSellerAccount = ()=> {
    return (
        <Routes>
            <Route index element={<Topbar />} />
            <Route path="/:SellerId" element={AdminSellerAccount} />
        </Routes>
    )
}

export default AdminCurrentSellerAccount;