import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './SettleBooking.css'
import HOC from '../../Components/HOC/HOC'
import { Link } from 'react-router-dom';
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

import { IoSearch } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoEyeOutline } from "react-icons/io5";

const SettleBooking = () => {
    const [settledata, setSettleData] = useState([]);

    const fetchSettleData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}api/v1/getSettleBooking`, getAuthHeaders())
            setSettleData(response.data.data);
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        }
    };

    useEffect(() => {
        fetchSettleData();
    }, []);

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
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>Subscription Booking</h6>
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
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>User Name</th>
                                    <th>Request Id</th>
                                    <th>Route From</th>
                                    <th>Route To</th>
                                    <th>Status</th>
                                    <th>Kilometers</th>
                                    <th>Pricing</th>
                                    <th>Action Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                                {settledata && settledata.length > 0 ? (
                                    settledata.map(settle => (
                                        <tr key={settle.id}>
                                            <td className='rider8'>
                                                <img src={settle?.user?.profilePicture} style={{ width: '50px' }} />
                                                {settle?.user?.name}
                                            </td>
                                            <td>{settle?.bookingId}</td>
                                            <td>{settle?.current?.address}</td>
                                            <td>{settle?.drop?.address}</td>
                                            <td>{settle.status}</td>
                                            <td>{settle.km} KM</td>
                                            <td style={{ color: '#F52D56' }}>₹ {settle.pricing}</td>
                                            <td className='rider9'>
                                                <div className='rider10'>
                                                    <FaCheck color='#000000' size={20} />
                                                    <p>Aprove</p>
                                                </div>
                                                <div className='rider10'>
                                                    <RxCross2 color='#000000' size={20} />
                                                    <p>Cancel</p>
                                                </div>
                                                <div className='rider10'>
                                                    <Link to={`/driver_details`} className='sidebar-link' >
                                                        <IoEyeOutline color='#000000' size={20} />
                                                        <p>View</p>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='pricing1'>
                    <Link to={'/alldailypricing'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Scheduled Rides</h5>
                                <div className='rider5'>
                                    <div className='rider6'>
                                        <IoSearch />
                                    </div>
                                    <input type="search" name="" id="" placeholder='Search Pricing' />
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={'/allhourlypricing'} className='sidebar-link'>
                        <div className='pricing2'>
                            <div className='pricing3'>
                                <h5>Cancelled Rides</h5>
                                <div className='rider5'>
                                    <div className='rider6'>
                                        <IoSearch />
                                    </div>
                                    <input type="search" name="" id="" placeholder='Search Pricing' />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default HOC(SettleBooking);
