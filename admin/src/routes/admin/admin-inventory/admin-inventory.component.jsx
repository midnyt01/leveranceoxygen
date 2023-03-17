import Topbar from "../../../component/admin-panel-components/admin-topbar/topbar.component";
import AdminInventoryDetail from "../../../component/admin-panel-components/admin-inventory/admin-inventory-details.component";
import AdminInventoryChart from "../../../component/admin-panel-components/admin-inventory/admin-inventory-chart.component";
import AdminInventoryTable from "../../../component/admin-panel-components/admin-inventory/admin-inventory-table.component";

const AdminInventory = () => {
  return (
    <div>
      <Topbar />
      <AdminInventoryDetail />
      <AdminInventoryChart />
      <AdminInventoryTable />
    </div>
  );
};

export default AdminInventory;
