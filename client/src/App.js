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


library.add(fas);

function App() {
  return (
    <Routes>

      {/* Customer */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/seller-page" element={<SellerPage />} />
      <Route path="/order-history" element={<OrderHistory />} />
    </Routes>
  );
}

export default App;
