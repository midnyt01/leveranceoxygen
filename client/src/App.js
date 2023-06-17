import { Routes, Route } from "react-router-dom";
// Customer Panel
import LandingPage from "./routes/customer/landing-page/landing-page.component";
import UserProfile from "./routes/customer/user-profile/user-profile.component";
import SellerPage from "./routes/customer/seller-page/seller-page.component";
import OrderHistory from "./routes/customer/order-history/order-history.component";

// CSS
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons'
// Images and Logo
import LeveranceOxygenLogo from "./assets/leverance_logo.png";
// import SellerCreateOrder from "./routes/seller/seller-create-order/seller-create-order.component";
library.add(fas, far, fab);

function App() {
  return (
    <Routes>
      {/* Common */}
      <Route path="/mainlogo" element={<LeveranceOxygenLogo />} />

      {/* Customer */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/seller-page" element={<SellerPage />} />
      <Route path="/order-history" element={<OrderHistory />} />
    </Routes>
  );
}

export default App;
