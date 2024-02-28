import Drivers from './Pages/All Drivers/Drivers';
import Riders from './Pages/All Riders/Riders';
import Vendors from './Pages/All Vendors/Vendors';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRouteProtect from '../src/Pages/Login/AdminRouteprotected';
import Riders_details from './Pages/All Riders/Riders_details';
import Driver_Details from './Pages/All Drivers/Driver_Details';
import Vendors_Details from './Pages/All Vendors/Vendors_Details';
import Bookings from './Pages/All Bookings/Bookings';
import Services from './Pages/Services/Services';
import CarDetails from './Pages/Services/CarDetails';
import UpdateBanners from './Pages/Update Banners/UpdateBanners';
import Pricing from './Pages/Pricing/Pricing';
import DailyPricing from './Pages/Pricing/DailyPricing';
import Outstationpricing from './Pages/Pricing/Outstationpricing';
import Addoutstationpricing from './Pages/Pricing/Addoutstationpricing';
import Basepricing from './Pages/Pricing/Basepricing';
import Taxes from './Pages/Pricing/Taxes';
import Services2 from './Pages/Services2/Services2';
import Add_Service from './Pages/Services2/Add_Service';
import Update_Service from './Pages/Services2/Update_Service';
import Wallet_Management from './Pages/Wallet Management/Wallet_Management';
import Payout_Management from './Pages/Payout Management/Payout_Management';
import All_Referrals from './Pages/All Referrals/All_Referrals';
import Vehicletype from './Pages/Vehicle type/Vehicletype';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AdminRouteProtect> <Dashboard /> </AdminRouteProtect>} />
          <Route path="/riders" element={<AdminRouteProtect> <Riders /> </AdminRouteProtect>}/>
          <Route path="/drivers" element={<AdminRouteProtect> <Drivers /> </AdminRouteProtect>} />
          <Route path="/vendors" element={<AdminRouteProtect> <Vendors /> </AdminRouteProtect>} />
          <Route path="/riders_details/:id" element={<AdminRouteProtect> <Riders_details /> </AdminRouteProtect>} />
          <Route path="/driver_details/:id" element={<AdminRouteProtect> <Driver_Details /> </AdminRouteProtect>} />
          <Route path="/vendors_details/:id" element={<AdminRouteProtect> <Vendors_Details /> </AdminRouteProtect>} />
          <Route path="/bookings" element={<AdminRouteProtect> <Bookings /> </AdminRouteProtect>} />
          <Route path="/services" element={<AdminRouteProtect> <Services2 /> </AdminRouteProtect>} />
          <Route path="/cardetails" element={<AdminRouteProtect> <CarDetails /> </AdminRouteProtect>} />
          <Route path="/updatebanners" element={<AdminRouteProtect> <UpdateBanners /> </AdminRouteProtect>} />
          <Route path="/pricing" element={<AdminRouteProtect> <Pricing /> </AdminRouteProtect>} />
          <Route path="/dailypricing" element={<AdminRouteProtect> <DailyPricing /> </AdminRouteProtect>} />
          <Route path="/outstationpricing" element={<AdminRouteProtect> <Outstationpricing /> </AdminRouteProtect>} />
          <Route path="/addoutstationpricing" element={<AdminRouteProtect> <Addoutstationpricing /> </AdminRouteProtect>} />
          <Route path="/basepricing" element={<AdminRouteProtect> <Basepricing /> </AdminRouteProtect>} />
          <Route path="/taxes" element={<AdminRouteProtect> <Taxes /> </AdminRouteProtect>} />
          <Route path="/add_service" element={<AdminRouteProtect> <Add_Service /> </AdminRouteProtect>} />
          <Route path="/Update_Service/:id" element={<AdminRouteProtect> <Update_Service /> </AdminRouteProtect>} />
          <Route path="/wallet_management" element={<AdminRouteProtect> <Wallet_Management /> </AdminRouteProtect>} />
          <Route path="/payout_management" element={<AdminRouteProtect> <Payout_Management /> </AdminRouteProtect>} />
          <Route path="/all_referrals" element={<AdminRouteProtect> <All_Referrals /> </AdminRouteProtect>} />
          <Route path="/vehicletype" element={<AdminRouteProtect> <Vehicletype /> </AdminRouteProtect>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
