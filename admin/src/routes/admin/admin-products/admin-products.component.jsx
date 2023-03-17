import Topbar from "../../../component/admin-panel-components/admin-topbar/topbar.component";
import AddProduct from "../../../component/admin-panel-components/admin-add-products/add-products.component";
import SeeAllProducts from "../../../component/admin-panel-components/see-all-products/see-all-products.component";


const AdminProducts = () => {
    return (
        <div>
            <Topbar />
            <AddProduct />
            <SeeAllProducts />
        </div>
    )
}

export default AdminProducts;