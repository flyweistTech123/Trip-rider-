import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './AllBookings.css'
import { useNavigate } from 'react-router-dom';
import HOC from '../../Components/HOC/HOC'

import { IoSearch } from "react-icons/io5";
import { BaseUrl, getAuthHeaders } from '../../Components/BaseUrl/BaseUrl';

import CustomPagination from '../../Components/Pagination/Pagination';


// import img from '../../Images/img5.png'


const AllCancledBooking = () => {
    const [bookingData, setBookingData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchCanceledBookings();
    }, [limit, search, page]);

    const fetchCanceledBookings = useCallback(() => {
        axios.get(`${BaseUrl}api/v1/getBooking?status=cancelpage=${page}&limit=${limit}&search=${search}`, getAuthHeaders()) // Assuming 'status' is the parameter for filtering canceled bookings
            .then(response => {
                setBookingData(response.data.data.docs);
            })
            .catch(error => {
                console.error('Error fetching canceled bookings:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, search]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
        setLoading(true);
    };



    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBookingData = bookingData.filter(booking =>
        booking?.userId?.name && booking?.userId?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const navigate = useNavigate();



    return (
        <>
            <div className='rider'>
                <div className='rider1'>
                    <div className='rider2'>
                        <div className='rider3'>
                            <h6>All canceled Rides</h6>
                        </div>

                        <div className='rider4'>
                            <button onClick={() => navigate('/bookings')}>Back</button>
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
                                    <th>(₹)Total Bill</th>
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
                                                    <td>{booking.bookingId}</td>
                                                    <td>{booking?.date}</td>
                                                    <td>{booking?.userId?.name}</td>
                                                    <td>{booking?.current?.address}</td>
                                                    <td>{booking?.time}</td>
                                                    <td>{booking?.distance} Km</td>
                                                    <td>{booking?.totalPrice}</td>
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
                                                    <td>{booking.bookingId}</td>
                                                    <td>{booking?.date}</td>
                                                    <td>{booking?.userId?.name}</td>
                                                    <td>{booking?.current?.address}</td>
                                                    <td>{booking?.time}</td>
                                                    <td>{booking?.distance} Km</td>
                                                    <td>{booking?.totalPrice}</td>
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
                <div className='rider_details555'>
                    <CustomPagination
                        page={page}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    )
}

export default HOC(AllCancledBooking)