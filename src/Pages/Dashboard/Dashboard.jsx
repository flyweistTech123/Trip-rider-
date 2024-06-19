import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Dashboard.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from "react-router-dom"; // Import Link for routing
import Pagination from 'react-bootstrap/Pagination';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

import CustomPagination from '../../Components/Pagination/Pagination';


import img from '../../Images/img6.png'
import img1 from '../../Images/img7.png'
import img2 from '../../Images/img8.png'
import img3 from '../../Images/img9.png'

const Dashboard = () => {
  const [totalbookings, setTotalbookings] = useState(0);
  const [totalRiders, setTotalRiders] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalcancel, setcancel] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);


  const [loading, setLoading] = useState(true);

  const [bookingtransaction, setBookingTransaction] = useState([])

  const cachedAdminData = localStorage.getItem('adminData');
  const adminData = JSON.parse(cachedAdminData);
  const role = localStorage.getItem('role');

  let permissionsArray = [];

  if (adminData && adminData.permissions) {
    permissionsArray = adminData.permissions;
  } else {
    console.log('Permissions array not found in adminData.');
  }




  const fetchTransactionData = useCallback(() => {
    axios.get(`${BaseUrl}api/v1/getAllBookingTransaction?page=${page}&limit=${limit}`, getAuthHeaders())
      .then(response => {
        setBookingTransaction(response.data.data.docs);
        setTotalPages(response.data.data.pages);
      })
      .catch(error => {
        console.error('Error fetching Transaction data:', error);
      })
  }, [page, limit, search]);

  useEffect(() => {
    fetchData();
    fetchTransactionData();
  }, [limit, search, page]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    setLoading(true);
  };

  const fetchData = async () => {
    try {
      const [ridreResponse, driversResponse, vendorsResponse, cancelRides, booking, earning] = await Promise.all([
        axios.get(`${BaseUrl}api/v1/admin/all/user`, getAuthHeaders()),
        axios.get(`${BaseUrl}api/v1/admin/all/driver`, getAuthHeaders()),
        axios.get(`${BaseUrl}api/v1/admin/all/vendor`, getAuthHeaders()),
        axios.get(`${BaseUrl}api/v1/getBooking?status=cancel`, getAuthHeaders()),
        axios.get(`${BaseUrl}api/v1/getBooking`, getAuthHeaders()),
        axios.get(`${BaseUrl}api/v1/admin/me`, getAuthHeaders()),
      ]);

      setTotalRiders(ridreResponse.data.data.totalDocs);
      setTotalDrivers(driversResponse.data.data.totalDocs);
      setTotalVendors(vendorsResponse.data.data.totalDocs);
      setcancel(cancelRides.data.data.totalDocs);
      setTotalbookings(booking.data.data.totalDocs);
      setTotalEarnings(earning.data.data.wallet);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    return `${formattedDate} `;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);


    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `${hours.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}${ampm}`;

    // Combine date and time
    return `${formattedTime} `;
  };



  return (
    <>
      <div className='rider'>
        <div className='dashboardconatiner'>
          <div className='rider2'>
            <div className='rider3'>
              <h6>Dashboard</h6>
            </div>
          </div>

          <div className='dashboard'>
            {role === "superAdmin" ? (
              <div>
                <div className='dashboard2'>
                  <Link to={'/vendors'} className='sidebar-link'>
                    <div className='dashboard1'>
                      <img src={img2} alt="" />
                      <p>Total Vendors</p>
                      {loading ? <p>Loading...</p> : <h6>{totalVendors}</h6>}
                    </div>
                  </Link>

                  <Link to={'/users'} className='sidebar-link'>
                    <div className='dashboard1'>
                      <img src={img} alt="" />
                      <p>Total Users</p>
                      {loading ? <p>Loading...</p> : <h6>{totalRiders}</h6>}
                    </div>
                  </Link>

                  <Link to={'/drivers'} className='sidebar-link'>
                    <div className='dashboard1'>
                      <img src={img1} alt="" />
                      <p>Total Drivers</p>
                      {loading ? <p>Loading...</p> : <h6>{totalDrivers}</h6>}
                    </div>
                  </Link>

                  <Link to={'/allearning'} className='sidebar-link'>
                    <div className='dashboard1'>
                      <img src={img3} alt="" />
                      <p>Total Earnings</p>
                      {loading ? <p>Loading...</p> : <h6>{totalEarnings}</h6>}
                    </div>
                  </Link>

                  <Link to={'/cancelled_booking'} className='sidebar-link'>
                    <div className='dashboard1'>
                      <img src={img1} alt="" />
                      <p>Total Cancelled Rides</p>
                      {loading ? <p>Loading...</p> : <h6>{totalcancel}</h6>}
                    </div>
                  </Link>

                  <Link to={'/allbookings'} className='sidebar-link'>
                    <div className='dashboard1'>
                      <img src={img1} alt="" />
                      <p>Total Bookings</p>
                      {loading ? <p>Loading...</p> : <h6>{totalbookings}</h6>}
                    </div>
                  </Link>
                </div>
                <div className='dashboard4'>
                  <h6>Latest Transactions</h6>
                  <div className='dashboard3'>
                    <table>
                      <thead>
                        <tr>
                          <th>Transaction No.</th>
                          <th>Transfer From</th>
                          <th>From Account</th>
                          <th>Payment Method</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Partner’s Earning</th>
                          <th>Admin’s Earning</th>
                          <th>My Earning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingtransaction.map(transaction => (
                          <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction?.user?.name}</td>
                            <td>{transaction?.driverId?.name}</td>
                            <td>{transaction.paymentMode}</td>
                            <td>{formatDate(transaction?.updatedAt)}</td>
                            <td>{formatTime(transaction?.updatedAt)}</td>
                            <td>{transaction?.driverAmount}</td>
                            <td>{transaction?.adminAmount}</td>
                            <td> <div className='dashboard5'>+{transaction?.amount}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            ) : (
              <div>
                {permissionsArray.map(permission => (
                  <React.Fragment key={permission.name}>
                    <div className='dashboard2'>
                      {permission.name === "All Vendors" && (
                        <Link to="/vendors" className="sidebar-link">
                          <div className="dashboard1">
                            <img src={img2} alt="" />
                            <p>Total Vendors</p>
                            {loading ? <p>Loading...</p> : <h6>{totalVendors}</h6>}
                          </div>
                        </Link>
                      )}

                      {permission.name === "All Users" && (
                        <Link to="/users" className="sidebar-link">
                          <div className="dashboard1">
                            <img src={img} alt="" />
                            <p>Total Users</p>
                            {loading ? <p>Loading...</p> : <h6>{totalRiders}</h6>}
                          </div>
                        </Link>
                      )}

                      {permission.name === "All Drivers" && (
                        <Link to="/drivers" className="sidebar-link">
                          <div className="dashboard1">
                            <img src={img1} alt="" />
                            <p>Total Drivers</p>
                            {loading ? <p>Loading...</p> : <h6>{totalDrivers}</h6>}
                          </div>
                        </Link>
                      )}

                      {permission.name === "All Earnings" && (
                        <Link to="/allearning" className="sidebar-link">
                          <div className="dashboard1">
                            <img src={img3} alt="" />
                            <p>Total Earnings</p>
                            {loading ? <p>Loading...</p> : <h6>{totalEarnings}</h6>}
                          </div>
                        </Link>
                      )}

                      {permission.name === "Subscription Booking" && (
                        <Link to="/cancelled_booking" className="sidebar-link">
                          <div className="dashboard1">
                            <img src={img1} alt="" />
                            <p>Total Cancelled Rides</p>
                            {loading ? <p>Loading...</p> : <h6>{totalcancel}</h6>}
                          </div>
                        </Link>
                      )}

                      {permission.name === "All Bookings" && (
                        <Link to="/allbookings" className="sidebar-link">
                          <div className="dashboard1">
                            <img src={img1} alt="" />
                            <p>Total Bookings</p>
                            {loading ? <p>Loading...</p> : <h6>{totalbookings}</h6>}
                          </div>
                        </Link>
                      )}


                    </div>
                    {permission.name === "All Earnings" && (
                      <div className='dashboard4'>
                        <h6>Latest Transactions</h6>
                        <div className='dashboard3'>
                          <table>
                            <thead>
                              <tr>
                                <th>Transaction No.</th>
                                <th>Transfer From</th>
                                <th>From Account</th>
                                <th>Payment Method</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Partner’s Earning</th>
                                <th>Admin’s Earning</th>
                                <th>My Earning</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookingtransaction.map(transaction => (
                                <tr key={transaction.id}>
                                  <td>{transaction.id}</td>
                                  <td>{transaction?.user?.name}</td>
                                  <td>{transaction?.driverId?.name}</td>
                                  <td>{transaction?.paymentMode}</td>
                                  <td>{formatDate(transaction?.updatedAt)}</td>
                                  <td>{formatTime(transaction?.updatedAt)}</td>
                                  <td>{transaction?.driverAmount}</td>
                                  <td>{transaction?.adminAmount}</td>
                                  <td> <div className='dashboard5'>+{transaction?.amount}</div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

            )}

          </div>
        </div>
        <div className='rider_details555'>
          <CustomPagination
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div >
    </>
  )
}

export default HOC(Dashboard)
