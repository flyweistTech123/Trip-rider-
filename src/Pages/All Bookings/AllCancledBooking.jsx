import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './AllBookings.css'
import { Link } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';



// import img from '../../Images/img5.png'


const AllCancledBooking = () => {
    const [bookingData, setBookingData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCanceledBookings();
    }, []);

    const fetchCanceledBookings = () => {
        axios.get(`${BaseUrl}api/v1/getBooking?status=cancel`, getAuthHeaders()) // Assuming 'status' is the parameter for filtering canceled bookings
            .then(response => {
                setBookingData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching canceled bookings:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };



    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBookingData = bookingData.filter(booking =>
        booking?.userId?.name && booking?.userId?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All canceled Rides</h6>
                        </div>

                        <div className='rider4'>
                            <div className='rider5'>
                                <div className='rider6'>
                                    <IoSearch />
                                </div>
                                <input type="search" name="" id=""
                                    placeholder='Search booking'
                                    onChange={handleSearch}
                                    value={searchQuery}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='rider7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>Booking by</th>
                                    <th>Location</th>
                                    <th>Timing</th>
                                    <th>Distance</th>
                                    <th>Total Bill</th>
                                    <th>Vehicle Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Loading canceled rides...</td>
                                    </tr>
                                ) :
                                    searchQuery && filteredBookingData.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" style={{ color: "#C3052C", fontWeight: "600", fontSize: "18px" }}>Ride not found</td>
                                        </tr>
                                    ) : (
                                        searchQuery
                                            ?
                                            filteredBookingData.map(booking => (
                                                <tr key={booking.id}>
                                                    <td className='rider8'>{booking.Id}</td>
                                                    <td>{booking?.date}</td>
                                                    <td>{booking?.userId?.name}</td>
                                                    <td>{booking?.current?.address}</td>
                                                    <td>{booking?.time}</td>
                                                    <td>{booking?.distance} Km</td>
                                                    <td>₹ {booking?.totalPrice}</td>
                                                    <td>{booking?.car?.name}</td>
                                                    <td style={{
                                                        color: booking?.status === 'cancel' ? '#F52D56' :
                                                            booking?.status === 'pending' ? '#FBAC2C' :
                                                                booking?.status === 'complete' ? '#609527' : 'black',
                                                        fontWeight: '600'
                                                    }}>
                                                        {booking?.status}
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            bookingData.map(booking => (
                                                <tr key={booking.id}>
                                                    <td className='rider8'>{booking.Id}</td>
                                                    <td>{booking?.date}</td>
                                                    <td>{booking?.userId?.name}</td>
                                                    <td>{booking?.current?.address}</td>
                                                    <td>{booking?.time}</td>
                                                    <td>{booking?.distance} Km</td>
                                                    <td>₹ {booking?.totalPrice}</td>
                                                    <td>{booking?.car?.name}</td>
                                                    <td style={{
                                                        color: booking?.status === 'cancel' ? '#F52D56' :
                                                            booking?.status === 'pending' ? '#FBAC2C' :
                                                                booking?.status === 'complete' ? '#609527' : 'black',
                                                        fontWeight: '600'
                                                    }}>
                                                        {booking?.status}
                                                    </td>
                                                </tr>
                                            ))
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HOC(AllCancledBooking)