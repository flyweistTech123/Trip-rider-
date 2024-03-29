import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from "react-router-dom"; // Import Link for routing

import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

import { IoSearch } from "react-icons/io5";


import img from '../../Images/img6.png'
import img1 from '../../Images/img7.png'
import img2 from '../../Images/img8.png'
import img3 from '../../Images/img9.png'

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRiders, setTotalRiders] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [newUsers, setNewUsers] = useState(0);

  const [bookingtransaction, setBookingTransaction] = useState([])


  const fetchTransactionData = () => {
    axios.get(`${BaseUrl}api/v1/getAllBookingTransaction`, getAuthHeaders())
      .then(response => {
        setBookingTransaction(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching Transaction data:', error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchTransactionData();
  }, []);

  const fetchData = async () => {
    try {
      const [ridreResponse, driversResponse, vendorsResponse] = await Promise.all([
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/admin/all/user'),
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/admin/all/driver'),
        axios.get('https://rajiv-cab-mu.vercel.app/api/v1/admin/all/vendor'),
      ]);

      setTotalRiders(ridreResponse.data.category.length);
      setTotalDrivers(driversResponse.data.category.length);
      setTotalVendors(vendorsResponse.data.category.length);
    } catch (error) {
      console.error('Error fetching data:', error);
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

            <div className='rider4'>
              <div className='rider5'>
                <div className='rider6'>
                  <IoSearch />
                </div>
                <input type="search" name="" id="" placeholder='Search Driver' />
              </div>
            </div>
          </div>

          <div className='dashboard'>
            <div className='dashboard2'>
              <Link className='sidebar-link'>
                <div className='dashboard1'>
                  <img src={img} alt="" />
                  <p>Total Users</p>
                  <h6>{totalUsers}</h6>
                </div>
              </Link>

              <Link to={'/riders'} className='sidebar-link'>
                <div className='dashboard1'>
                  <img src={img} alt="" />
                  <p>Total Riders</p>
                  <h6>{totalRiders}</h6>
                </div>
              </Link>

              <Link to={'/drivers'} className='sidebar-link'>
                <div className='dashboard1'>
                  <img src={img1} alt="" />
                  <p>Total Drivers</p>
                  <h6>{totalDrivers}</h6>
                </div>
              </Link>
            </div>
            <div className='dashboard2'>
              <Link to={'/vendors'} className='sidebar-link' >
                <div className='dashboard1'>
                  <img src={img2} alt="" />
                  <p>Total Vendors</p>
                  <h6>{totalVendors}</h6>
                </div>
              </Link>
              <Link className='sidebar-link' >
                <div className='dashboard1'>
                  <img src={img3} alt="" />
                  <p>Total Earnings/Invoices</p>
                  <h6>{totalEarnings}</h6>
                </div>
              </Link>
              <Link className='sidebar-link' >
                <div className='dashboard1'>
                  <img src={img} alt="" />
                  <p>New Users</p>
                  <h6>{newUsers}</h6>
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
                        <td>{transaction.user.name}</td>
                        <td>{transaction.driverId.name}</td>
                        <td>{transaction.paymentMode}</td>
                        <td>{formatDate(transaction.updatedAt)}</td>
                        <td>{formatTime(transaction.updatedAt)}</td>
                        <td>{transaction.driverAmount}</td>
                        <td>{transaction.adminAmount}</td>
                        <td> <div className='dashboard5'>+{transaction.amount}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HOC(Dashboard)
