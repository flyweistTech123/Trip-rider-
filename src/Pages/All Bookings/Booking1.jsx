
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Bookings.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

import { FaCalendarDays } from "react-icons/fa6";



// import img from '../../Images/img5.png'


const Booking1 = () => {
    const [bookingData, setBookingData] = useState([]);

    const fetchBookingData = () => {
        axios.get(`${BaseUrl}api/v1/getBooking`, getAuthHeaders())
            .then(response => {
                setBookingData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching Booking data:', error);
            });
    };

    useEffect(() => {
        fetchBookingData();
    }, []);



    const toggleCalendar = () => {
        const inputElement = document.getElementById('calendar-input');
        inputElement.focus();
    };



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All Bookings</h6>
                        </div>

                        <div className='rider4'>
                            <div className='booking'>
                                <p>08/17/2023</p>
                                <div className='booking1'>
                                    <FaCalendarDays color='#FFFFFF' onClick={toggleCalendar} />
                                    <input type="date" id="calendar-input" style={{ display: 'none' }} />
                                </div>
                            </div>
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
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>Timing</th>
                                    <th>Distance</th>
                                    <th>Total Bill</th>
                                    <th>Vehicle Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingData.map(booking => (
                                    <tr key={booking.id}>
                                        <td className='rider8'>
                                            {booking?.userId || 'N/A'}
                                        </td>
                                        <td>{booking?.date}</td>
                                        <td>{booking?.time}</td>
                                        <td>{booking?.distance} Km</td>
                                        <td>₹{booking?.totalPrice}</td>
                                        <td>{booking?.car?.name || 'N/A'}</td>
                                        <td>{booking?.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(Booking1)