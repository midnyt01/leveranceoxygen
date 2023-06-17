import Banner from "../../../component/customer-panel-components/banner/banner.component";
import BottomNav from "../../../component/customer-panel-components/bottom-nav/bottom-nav.component";
import Map from "../../../component/customer-panel-components/map/map.component";
import PorductList from "../../../component/customer-panel-components/product-list/product-list.component";
import SellersList from "../../../component/customer-panel-components/sellers-list/sellers-list.component";
import Topbar from "../../../component/customer-panel-components/topbar/topbar.component";

const LandingPage = () => {
  return (
    <div>
      <Topbar/>
      <Banner />
      <PorductList />
      <Map />
      <SellersList />
      <BottomNav />
    </div>
  );
};

export default LandingPage;
