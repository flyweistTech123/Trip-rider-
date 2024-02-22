import Drivers from './Pages/All Drivers/Drivers';
import Riders from './Pages/All Riders/Riders';
import Vendors from './Pages/All Vendors/Vendors';
import Dashboard from './Pages/Dashboard/Dashboard';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRouteProtect from '../src/Pages/Login/AdminRouteprotected';


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
        </Routes>
      </Router>
    </>
  );
}

export default App;
