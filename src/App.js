import Drivers from './Pages/All Drivers/Drivers';
import Users from './Pages/All Users/Users';
import Vendors from './Pages/All Vendors/Vendors';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRouteProtect from '../src/Pages/Login/AdminRouteprotected';
import Users_details from './Pages/All Users/Users_details.jsx';
import Driver_Details from './Pages/All Drivers/Driver_Details';
import Vendors_Details from './Pages/All Vendors/Vendors_Details';
import UpdateBanners from './Pages/Update Banners/UpdateBanners';
import Pricing from './Pages/Pricing/Pricing';
import AddDailyPricing from './Pages/Pricing/DailyPricing/AddDailyPricing';
import UpdateDailypricing from './Pages/Pricing/DailyPricing/UpdateDailypricing';
import Alldailypricing from './Pages/Pricing/DailyPricing/AllDailyPricing';
import Addoutstationpricing from './Pages/Pricing/outstation pricing/Addoutstationpricing';
// import Taxes from './Pages/Pricing/Taxes/Taxes';
import Services from './Pages/Services/Services';
import Add_Service from './Pages/Services/Add_Service';
import Update_Service from './Pages/Services/Update_Service';
import Wallet_Management from './Pages/Wallet Management/Wallet_Management';
import Payout_Management from './Pages/Payout Management/Payout_Management';
import All_Referrals from './Pages/All Referrals/All_Referrals';
import Vehicletype from './Pages/Vehicle type/Vehicletype';
import AllHourlyPricing from './Pages/Pricing/HourlyPricing/AllHourlyPricing';
import UpdateHourlyPricing from './Pages/Pricing/HourlyPricing/UpdateHourlyPricing';
import AddHourlyPricing from './Pages/Pricing/HourlyPricing/AddHourlyPricing';
// import AllBasepricing from './Pages/Pricing/base pricing/AllBasepricing';
import AddBasepricing from './Pages/Pricing/base pricing/AddBasepricing';
import UpdateBasepricing from './Pages/Pricing/base pricing/UpdateBasepricing';
import AllOutstationpricing from './Pages/Pricing/outstation pricing/AllOutstationpricing';
import Updateoutstationpricing from './Pages/Pricing/outstation pricing/Updateoutstationpricing';
import AllAmbulancePricing from './Pages/Pricing/Ambulance Pricing/AllAmbulancePricing';
import AddAmbulancePricing from './Pages/Pricing/Ambulance Pricing/AddAmbulancePricing';
import UpdateAmbulancePricing from './Pages/Pricing/Ambulance Pricing/UpdateAmbulancePricing';
import AllnormalVehicles from './Pages/Vehicle type/AllnormalVehicles';
import AddnormalVehicles from './Pages/Vehicle type/AddnormalVehicles';
import UpdatenormalVehicles from './Pages/Vehicle type/UpdatenormalVehicles';
import AllLocation from './Pages/Location/AllLocation';
import AllPromoCode from './Pages/Promo Code/AllPromoCode';
import AddPromoCode from './Pages/Promo Code/AddPromoCode';
import UpdatePromoCode from './Pages/Promo Code/UpdatePromoCode';
import Termsandconditions from './Pages/Terms and conditions/Termsandconditions';
import Privacypolicy from './Pages/Privacy policy/Privacypolicy';
import AddTermsandconditions from './Pages/Terms and conditions/AddTermsandconditions';
import UpdateTermsandconditions from './Pages/Terms and conditions/UpdateTermsandconditions';
import AddPrivacypolicy from './Pages/Privacy policy/AddPrivacypolicy';
import UpdatePrivacypolicy from './Pages/Privacy policy/UpdatePrivacypolicy';
import AllSuperCarPricing from './Pages/Pricing/Super Car Pricing/AllSuperCarPricing';
import AddSuperCarPricing from './Pages/Pricing/Super Car Pricing/AddSuperCarPricing';
import AllsuperCarVehicles from './Pages/Vehicle type/AllsuperCarVehicles';
import AddsuperCarVehicles from './Pages/Vehicle type/AddsuperCarVehicles';
import UpdatesuperCarVehicles from './Pages/Vehicle type/UpdatesuperCarVehicles';
import Privileges from './Pages/Privileges/Privileges';
import Earnings from './Pages/Earnings/Earnings';
import RefundTransaction from './Pages/Payout Management/RefundTransaction';
import Pay_User from './Pages/Payout Management/Pay_User';
import SOSUpdate from './Pages/SOS Update/SOSUpdate';
import SOSLocation from './Pages/SOS Update/SOSLocation';
import Setting from './Pages/Setting/Setting';
import AdminProfile from './Pages/Admin/AdminProfile';
// import AllAdmin from './Pages/Admin/AllAdmin';
import SettleBooking from './Pages/Subscription booking/SettleBooking.jsx';
import SettleBookingDetails from './Pages/Subscription booking/SettleBookingDetails.jsx';
import Notification from './Pages/Notification/Notification.jsx';
import AllBookings from './Pages/All Bookings/AllBookings.jsx';
import LiveChart from './Pages/Live Chart/LiveChart.jsx';
import Register from './Pages/Register/Register.jsx';
import Geofencing from './Pages/Geofencing view/Geofencing.jsx';
import AllCancledBooking from './Pages/All Bookings/AllCancledBooking.jsx';
import AllScheduledBooking from './Pages/All Bookings/AllScheduledBooking.jsx';
// import AllTaxpricing from './Pages/Pricing/Taxes/AllTaxpricing.jsx';
import AddTaxpricing from './Pages/Pricing/Taxes/AddTaxpricing.jsx';
import UpdateTaxpricing from './Pages/Pricing/Taxes/UpdateTaxpricing.jsx';
import AllBasepricing from './Pages/Pricing/base pricing/AllBasepricing.jsx';
import UpdateSuperCarPricing from './Pages/Pricing/Super Car Pricing/UpdateSuperCarPricing.jsx';
import BookingDetails from './Pages/All Bookings/BookingDetails.jsx';
import LiveChartWithDriver from './Pages/Live Chart/LiveChartWithDriver.jsx';
import AdminDetails from './Pages/Admin/AdminDetails.jsx';
import AdminEarning from './Pages/AdminEarning/AdminEarning.jsx';
import User_Bookings from './Pages/All Users/User_Bookings.jsx';
import Driver_Bookings from './Pages/All Drivers/Driver_Bookings.jsx';
import Vendor_bookings from './Pages/All Vendors/Vendor_bookings.jsx';
import Bookings from './Pages/All Bookings/Bookings.jsx';
import AllState from './Pages/Location/AllState.jsx';
import AllCity from './Pages/Location/AllCity.jsx';
import AddCity from './Pages/Location/AddCity.jsx';
import UpdateCity from './Pages/Location/UpdateCity.jsx';



function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<AdminRouteProtect> <Dashboard /> </AdminRouteProtect>} />
            <Route path="/users" element={<AdminRouteProtect> <Users /> </AdminRouteProtect>} />
            <Route path="/drivers" element={<AdminRouteProtect> <Drivers /> </AdminRouteProtect>} />
            <Route path="/vendors" element={<AdminRouteProtect> <Vendors /> </AdminRouteProtect>} />
            <Route path="/user_details/:id" element={<AdminRouteProtect> <Users_details /> </AdminRouteProtect>} />
            <Route path="/driver_details/:id" element={<AdminRouteProtect> <Driver_Details /> </AdminRouteProtect>} />
            <Route path="/vendors_details/:id" element={<AdminRouteProtect> <Vendors_Details /> </AdminRouteProtect>} />
            <Route path="/services" element={<AdminRouteProtect> <Services /> </AdminRouteProtect>} />
            <Route path="/updatebanners" element={<AdminRouteProtect> <UpdateBanners /> </AdminRouteProtect>} />
            <Route path="/pricing" element={<AdminRouteProtect> <Pricing /> </AdminRouteProtect>} />
            <Route path="/alldailypricing" element={<AdminRouteProtect> <Alldailypricing /> </AdminRouteProtect>} />
            <Route path="/updatedailypricing/:id" element={<AdminRouteProtect> <UpdateDailypricing /> </AdminRouteProtect>} />
            <Route path="/adddailypricing" element={<AdminRouteProtect> <AddDailyPricing /> </AdminRouteProtect>} />
            <Route path="/allhourlypricing" element={<AdminRouteProtect> <AllHourlyPricing /> </AdminRouteProtect>} />
            <Route path="/updatehourlypricing/:id" element={<AdminRouteProtect> <UpdateHourlyPricing /> </AdminRouteProtect>} />
            <Route path="/addhourlypricing" element={<AdminRouteProtect> <AddHourlyPricing /> </AdminRouteProtect>} />
            <Route path="/allbasepricing" element={<AdminRouteProtect> <AllBasepricing /> </AdminRouteProtect>} />
            <Route path="/addbasepricing" element={<AdminRouteProtect> <AddBasepricing /> </AdminRouteProtect>} />
            <Route path="/updatebasepricing/:id" element={<AdminRouteProtect> <UpdateBasepricing /> </AdminRouteProtect>} />
            <Route path="/alloutstationpricing" element={<AdminRouteProtect> <AllOutstationpricing /> </AdminRouteProtect>} />
            <Route path="/addoutstationpricing" element={<AdminRouteProtect> <Addoutstationpricing /> </AdminRouteProtect>} />
            <Route path="/updateoutstationpricing/:id" element={<AdminRouteProtect> <Updateoutstationpricing /> </AdminRouteProtect>} />
            <Route path="/allambulancepricing" element={<AdminRouteProtect> <AllAmbulancePricing /> </AdminRouteProtect>} />
            <Route path="/addambulancepricing" element={<AdminRouteProtect> <AddAmbulancePricing /> </AdminRouteProtect>} />
            <Route path="/updateambulancepricing/:id" element={<AdminRouteProtect> <UpdateAmbulancePricing /> </AdminRouteProtect>} />
            <Route path="/allsupercarpricing" element={<AdminRouteProtect> <AllSuperCarPricing /> </AdminRouteProtect>} />
            <Route path="/addsupercarpricing" element={<AdminRouteProtect> <AddSuperCarPricing /> </AdminRouteProtect>} />
            {/* <Route path="/taxes" element={<AdminRouteProtect> <Taxes /> </AdminRouteProtect>} /> */}
            {/* <Route path="/alltaxpricing" element={<AdminRouteProtect> <AllTaxpricing /> </AdminRouteProtect>} /> */}
            <Route path="/taxpricing" element={<AdminRouteProtect> <AddTaxpricing /> </AdminRouteProtect>} />
            <Route path="/updatetaxpricing/:id" element={<AdminRouteProtect> <UpdateTaxpricing /> </AdminRouteProtect>} />
            <Route path="/add_service" element={<AdminRouteProtect> <Add_Service /> </AdminRouteProtect>} />
            <Route path="/Update_Service/:id" element={<AdminRouteProtect> <Update_Service /> </AdminRouteProtect>} />
            <Route path="/wallet_management" element={<AdminRouteProtect> <Wallet_Management /> </AdminRouteProtect>} />
            <Route path="/payout_management" element={<AdminRouteProtect> <Payout_Management /> </AdminRouteProtect>} />
            <Route path="/all_referrals" element={<AdminRouteProtect> <All_Referrals /> </AdminRouteProtect>} />
            <Route path="/vehicletype" element={<AdminRouteProtect> <Vehicletype /> </AdminRouteProtect>} />
            <Route path="/allnormalvehicles" element={<AdminRouteProtect> <AllnormalVehicles /> </AdminRouteProtect>} />
            <Route path="/addnormalvehicles" element={<AdminRouteProtect> <AddnormalVehicles /> </AdminRouteProtect>} />
            <Route path="/updatenormalvehicles/:id" element={<AdminRouteProtect> <UpdatenormalVehicles /> </AdminRouteProtect>} />
            <Route path="/allsuperCarvehicles" element={<AdminRouteProtect> <AllsuperCarVehicles /> </AdminRouteProtect>} />
            <Route path="/addsupercarvehicles" element={<AdminRouteProtect> <AddsuperCarVehicles /> </AdminRouteProtect>} />
            <Route path="/updatesupercarvehicles/:id" element={<AdminRouteProtect> <UpdatesuperCarVehicles /> </AdminRouteProtect>} />
            <Route path="/alllocation" element={<AdminRouteProtect> <AllLocation /> </AdminRouteProtect>} />
            <Route path="/allstate" element={<AdminRouteProtect> <AllState /> </AdminRouteProtect>} />
            <Route path="/allcity" element={<AdminRouteProtect> <AllCity /> </AdminRouteProtect>} />
            <Route path="/addcity" element={<AdminRouteProtect> <AddCity /> </AdminRouteProtect>} />
            <Route path="/updatecity/:id" element={<AdminRouteProtect> <UpdateCity /> </AdminRouteProtect>} />
            <Route path="/allpromocode" element={<AdminRouteProtect> <AllPromoCode /> </AdminRouteProtect>} />
            <Route path="/addpromocode" element={<AdminRouteProtect> <AddPromoCode /> </AdminRouteProtect>} />
            <Route path="/updatepromocode/:id" element={<AdminRouteProtect> <UpdatePromoCode /> </AdminRouteProtect>} />
            <Route path="/termsandconditions" element={<AdminRouteProtect> <Termsandconditions /> </AdminRouteProtect>} />
            <Route path="/addtermsandconditions" element={<AdminRouteProtect> <AddTermsandconditions /> </AdminRouteProtect>} />
            <Route path="/updatetermsandconditions/:id" element={<AdminRouteProtect> <UpdateTermsandconditions /> </AdminRouteProtect>} />
            <Route path="/privacypolicy" element={<AdminRouteProtect> <Privacypolicy /> </AdminRouteProtect>} />
            <Route path="/addprivacypolicy" element={<AdminRouteProtect> <AddPrivacypolicy /> </AdminRouteProtect>} />
            <Route path="/updateprivacypolicy/:id" element={<AdminRouteProtect> <UpdatePrivacypolicy /> </AdminRouteProtect>} />
            <Route path="/privileges" element={<AdminRouteProtect> <Privileges /> </AdminRouteProtect>} />
            <Route path="/earnings" element={<AdminRouteProtect> <Earnings /> </AdminRouteProtect>} />
            <Route path="/refundtransaction" element={<AdminRouteProtect> <RefundTransaction /> </AdminRouteProtect>} />
            <Route path="/pay_user/:id" element={<AdminRouteProtect> <Pay_User /> </AdminRouteProtect>} />
            <Route path="/sos" element={<AdminRouteProtect> <SOSUpdate /> </AdminRouteProtect>} />
            <Route path="/soslocation/:id" element={<AdminRouteProtect> <SOSLocation /> </AdminRouteProtect>} />
            <Route path="/setting" element={<AdminRouteProtect> <Setting /> </AdminRouteProtect>} />
            <Route path="/adminprofile" element={<AdminRouteProtect> <AdminProfile /> </AdminRouteProtect>} />
            {/* <Route path="/alladmin" element={<AdminRouteProtect> <AllAdmin /> </AdminRouteProtect>} /> */}
            <Route path="/settlebooking" element={<AdminRouteProtect> <SettleBooking /> </AdminRouteProtect>} />
            <Route path="/settlebookingdetails/:id" element={<AdminRouteProtect> <SettleBookingDetails /> </AdminRouteProtect>} />
            <Route path="/notification" element={<AdminRouteProtect> <Notification /> </AdminRouteProtect>} />
            <Route path="/allbookings" element={<AdminRouteProtect> <AllBookings /> </AdminRouteProtect>} />
            <Route path="/livechart" element={<AdminRouteProtect> <LiveChart /> </AdminRouteProtect>} />
            <Route path="/geofencing_view" element={<AdminRouteProtect> <Geofencing /> </AdminRouteProtect>} />
            <Route path="/cancelled_booking" element={<AdminRouteProtect> <AllCancledBooking /> </AdminRouteProtect>} />
            <Route path="/scheduled_booking" element={<AdminRouteProtect> <AllScheduledBooking /> </AdminRouteProtect>} />
            <Route path="/updatesupercarpricing/:id" element={<AdminRouteProtect> <UpdateSuperCarPricing /> </AdminRouteProtect>} />
            <Route path="/bookingdetails/:id" element={<AdminRouteProtect> <BookingDetails /> </AdminRouteProtect>} />
            <Route path="/liveChartWithDriver" element={<AdminRouteProtect> <LiveChartWithDriver /> </AdminRouteProtect>} />
            <Route path="/admindetails/:id" element={<AdminRouteProtect> <AdminDetails /> </AdminRouteProtect>} />
            <Route path="/allearning" element={<AdminRouteProtect> <AdminEarning /> </AdminRouteProtect>} />
            <Route path="/user_bookings/:id" element={<AdminRouteProtect> <User_Bookings /> </AdminRouteProtect>} />
            <Route path="/driver_bookings/:id" element={<AdminRouteProtect> <Driver_Bookings /> </AdminRouteProtect>} />
            <Route path="/vendor_bookings/:id" element={<AdminRouteProtect> <Vendor_bookings /> </AdminRouteProtect>} />
            <Route path="/bookings" element={<AdminRouteProtect> <Bookings /> </AdminRouteProtect>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
