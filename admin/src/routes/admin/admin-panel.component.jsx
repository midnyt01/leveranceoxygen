import Topbar from "../../component/admin-panel-components/admin-topbar/topbar.component";
import AdminAnalytics from "../../component/admin-panel-components/admin-analytics/admin-analytics.component";
import AdminAnalyticsPie from "../../component/admin-panel-components/admin-analytics/admin-analytics-pie.component";
import StickyRefresh from "../../component/common/sticky-refresh";

const AdminPanel = () => {
  return (
    <div>
      <Topbar />
      <AdminAnalytics />
      <AdminAnalyticsPie />
      <StickyRefresh />
    </div>
  );
};

export default AdminPanel;
