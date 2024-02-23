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
        </Routes>
      </Router>
    </>
  );
}

export default App;
