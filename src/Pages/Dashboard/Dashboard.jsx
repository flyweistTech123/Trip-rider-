import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from "react-router-dom"; // Import Link for routing


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

  useEffect(() => {
    fetchData();
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

  return (
    <>
      <div className='rider'>
        <div className='rider1'>
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
                  <p>Total Earnings</p>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default HOC(Dashboard)
