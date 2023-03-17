import Topbar from "../../../component/admin-panel-components/admin-topbar/topbar.component";
import AddSellerAccount from "../../../component/admin-panel-components/admin-add-sellers/add-sellers.component";
import SeeAllSellers from "../../../component/admin-panel-components/see-all-sellers/see-all-sellers.component";

const AdminSellers = () => {
    return (
        <div>
            <Topbar />
            <AddSellerAccount />
            <SeeAllSellers />
        </div>
    )
}

export default AdminSellers;